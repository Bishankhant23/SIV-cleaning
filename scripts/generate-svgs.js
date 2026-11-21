const fs = require('fs');
const zlib = require('zlib');

// Parse TTF functions
function parseTTF(buf) {
  const numTables = buf.readUInt16BE(4);
  const tables = {};
  for (let i = 0; i < numTables; i++) {
    const offset = 12 + i * 16;
    const tag = buf.subarray(offset, offset + 4).toString('ascii');
    const tableOffset = buf.readUInt32BE(offset + 8);
    const tableLen = buf.readUInt32BE(offset + 12);
    tables[tag] = { offset: tableOffset, length: tableLen };
  }
  const head = tables['head'];
  const indexToLocFormat = buf.readInt16BE(head.offset + 50);
  const unitsPerEm = buf.readUInt16BE(head.offset + 18);
  const maxp = tables['maxp'];
  const numGlyphs = buf.readUInt16BE(maxp.offset + 4);
  const loca = tables['loca'];
  const glyf = tables['glyf'];
  const hhea = tables['hhea'];
  const hmtx = tables['hmtx'];
  const numOfLongHorMetrics = buf.readUInt16BE(hhea.offset + 34);

  const glyphs = {};
  for (let gid = 0; gid < numGlyphs; gid++) {
    const off1 = indexToLocFormat === 0 ? buf.readUInt16BE(loca.offset + gid * 2) * 2 : buf.readUInt32BE(loca.offset + gid * 4);
    const off2 = indexToLocFormat === 0 ? buf.readUInt16BE(loca.offset + (gid + 1) * 2) * 2 : buf.readUInt32BE(loca.offset + (gid + 1) * 4);
    
    let advanceWidth = 0;
    if (gid < numOfLongHorMetrics) {
      advanceWidth = buf.readUInt16BE(hmtx.offset + gid * 4);
    } else {
      advanceWidth = buf.readUInt16BE(hmtx.offset + (numOfLongHorMetrics - 1) * 4);
    }

    if (off2 > off1) {
      const gOff = glyf.offset + off1;
      const numContours = buf.readInt16BE(gOff);
      if (numContours > 0) {
        glyphs[gid] = { ...parseSimpleGlyph(buf, gOff), advanceWidth };
      }
    } else {
      glyphs[gid] = { d: '', bbox: [0,0,0,0], advanceWidth };
    }
  }
  return { unitsPerEm, glyphs };
}

function parseSimpleGlyph(buf, gOff) {
  const numContours = buf.readInt16BE(gOff);
  const xMin = buf.readInt16BE(gOff + 2);
  const yMin = buf.readInt16BE(gOff + 4);
  const xMax = buf.readInt16BE(gOff + 6);
  const yMax = buf.readInt16BE(gOff + 8);
  
  let offset = gOff + 10;
  const endPtsOfContours = [];
  for (let i = 0; i < numContours; i++) {
    endPtsOfContours.push(buf.readUInt16BE(offset));
    offset += 2;
  }
  const numPoints = endPtsOfContours[numContours - 1] + 1;
  const instructionLength = buf.readUInt16BE(offset);
  offset += 2 + instructionLength;
  
  const flags = [];
  while (flags.length < numPoints) {
    const flag = buf.readUInt8(offset++);
    flags.push(flag);
    if (flag & 0x08) {
      const repeatCount = buf.readUInt8(offset++);
      for (let r = 0; r < repeatCount; r++) {
        flags.push(flag);
      }
    }
  }
  
  const xCoords = [];
  let curX = 0;
  for (let i = 0; i < numPoints; i++) {
    const flag = flags[i];
    if (flag & 0x02) {
      const val = buf.readUInt8(offset++);
      curX += (flag & 0x10) ? val : -val;
    } else {
      if (!(flag & 0x10)) {
        curX += buf.readInt16BE(offset);
        offset += 2;
      }
    }
    xCoords.push(curX);
  }
  
  const yCoords = [];
  let curY = 0;
  for (let i = 0; i < numPoints; i++) {
    const flag = flags[i];
    if (flag & 0x04) {
      const val = buf.readUInt8(offset++);
      curY += (flag & 0x20) ? val : -val;
    } else {
      if (!(flag & 0x20)) {
        curY += buf.readInt16BE(offset);
        offset += 2;
      }
    }
    yCoords.push(curY);
  }
  
  let d = '';
  let startIdx = 0;
  for (let c = 0; c < numContours; c++) {
    const endIdx = endPtsOfContours[c];
    const pts = [];
    for (let p = startIdx; p <= endIdx; p++) {
      const curr = { x: xCoords[p], y: yCoords[p], onCurve: !!(flags[p] & 0x01) };
      const nextIdx = p === endIdx ? startIdx : p + 1;
      const next = { x: xCoords[nextIdx], y: yCoords[nextIdx], onCurve: !!(flags[nextIdx] & 0x01) };
      pts.push(curr);
      if (!curr.onCurve && !next.onCurve) {
        pts.push({
          x: (curr.x + next.x) / 2,
          y: (curr.y + next.y) / 2,
          onCurve: true
        });
      }
    }
    startIdx = endIdx + 1;
    if (pts.length === 0) continue;
    
    let firstOn = 0;
    while (firstOn < pts.length && !pts[firstOn].onCurve) firstOn++;
    if (firstOn === pts.length) {
      pts.push({ x: (pts[0].x + pts[1].x)/2, y: (pts[0].y + pts[1].y)/2, onCurve: true });
      firstOn = pts.length - 1;
    }
    const rotated = [...pts.slice(firstOn), ...pts.slice(0, firstOn)];
    d += 'M ' + rotated[0].x + ' ' + rotated[0].y + ' ';
    let i = 1;
    while (i < rotated.length) {
      if (rotated[i].onCurve) {
        d += 'L ' + rotated[i].x + ' ' + rotated[i].y + ' ';
        i++;
      } else {
        const ctrl = rotated[i];
        const end = rotated[(i + 1) % rotated.length];
        d += 'Q ' + ctrl.x + ' ' + ctrl.y + ' ' + end.x + ' ' + end.y + ' ';
        i += 2;
      }
    }
    d += 'Z ';
  }
  return { d, bbox: [xMin, yMin, xMax, yMax] };
}

function parsePDFPath(subStr) {
  const tokens = subStr.trim().split(/\s+/);
  let svgD = '';
  let curX = 0, curY = 0;
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    if (t === 'm') {
      const x = parseFloat(tokens[i-2]);
      const y = parseFloat(tokens[i-1]);
      svgD += 'M ' + x + ' ' + y + ' ';
      curX = x; curY = y;
      i++;
    } else if (t === 'l') {
      const x = parseFloat(tokens[i-2]);
      const y = parseFloat(tokens[i-1]);
      svgD += 'L ' + x + ' ' + y + ' ';
      curX = x; curY = y;
      i++;
    } else if (t === 'c') {
      const x1 = parseFloat(tokens[i-6]);
      const y1 = parseFloat(tokens[i-5]);
      const x2 = parseFloat(tokens[i-4]);
      const y2 = parseFloat(tokens[i-3]);
      const x3 = parseFloat(tokens[i-2]);
      const y3 = parseFloat(tokens[i-1]);
      svgD += 'C ' + x1 + ' ' + y1 + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3 + ' ';
      curX = x3; curY = y3;
      i++;
    } else if (t === 'v') {
      const x2 = parseFloat(tokens[i-4]);
      const y2 = parseFloat(tokens[i-3]);
      const x3 = parseFloat(tokens[i-2]);
      const y3 = parseFloat(tokens[i-1]);
      svgD += 'C ' + curX + ' ' + curY + ', ' + x2 + ' ' + y2 + ', ' + x3 + ' ' + y3 + ' ';
      curX = x3; curY = y3;
      i++;
    } else if (t === 'y') {
      const x1 = parseFloat(tokens[i-4]);
      const y1 = parseFloat(tokens[i-3]);
      const x3 = parseFloat(tokens[i-2]);
      const y3 = parseFloat(tokens[i-1]);
      svgD += 'C ' + x1 + ' ' + y1 + ', ' + x3 + ' ' + y3 + ', ' + x3 + ' ' + y3 + ' ';
      curX = x3; curY = y3;
      i++;
    } else if (t === 'h') {
      svgD += 'Z ';
      i++;
    } else {
      i++;
    }
  }
  return svgD.trim();
}

const aliceTTF = parseTTF(fs.readFileSync('font-glacial.ttf')); // Alice (Obj 39)
const glacialTTF = parseTTF(fs.readFileSync('font-alice.ttf')); // Glacial (Obj 37)

const pdfBuf = fs.readFileSync('logo-source.pdf');
const pdfStr = pdfBuf.toString('latin1');
const m13 = pdfStr.match(/(?:^|\n)13\s+\d+\s+obj\s*<<([\s\S]*?)>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/);
const stream13 = zlib.inflateSync(Buffer.from(m13[2], 'latin1')).toString('latin1');

const pathAIdx = stream13.indexOf('0.784 0.62 0.404 0.667 k');
const pathBIdx = stream13.indexOf('0.737 0.259 0.035 0.043 k');
const pathBEnd = stream13.indexOf('f\nEMC', pathBIdx);

const pathAStr = stream13.slice(pathAIdx + 24, pathBIdx);
const pathBStr = stream13.slice(pathBIdx + 25, pathBEnd);

const svgEmblemNavy = parsePDFPath(pathAStr);
const svgEmblemCyan = parsePDFPath(pathBStr);

// Generate SIV paths
const s1Gids = [
  { gid: 48, kern: -62.9375 },
  { gid: 25, kern: -62.9639 },
  { gid: 55, kern: 0 }
];

let curX1 = 1544.57;
let sivPaths = [];
for (let item of s1Gids) {
  const glyph = aliceTTF.glyphs[item.gid];
  const scale = 392.625 / 1000;
  sivPaths.push(`<path d="${glyph.d.trim()}" transform="translate(${curX1.toFixed(3)}, 1097.200) scale(${scale.toFixed(6)})" />`);
  curX1 += (glyph.advanceWidth / 1000) * 392.625 + (-item.kern / 1000) * 392.625;
}

// Generate FACILITY SERVICES paths
const s2Items = [
  { gid: 41, kern: -121.818 }, // F
  { gid: 36, kern: -121.796 }, // A
  { gid: 38, kern: -121.751 }, // C
  { gid: 44, kern: -121.922 }, // I
  { gid: 47, kern: -121.872 }, // L
  { gid: 44, kern: -121.922 }, // I
  { gid: 55, kern: -121.83 },  // T
  { gid: 60, kern: -121.786 }, // Y
  { gid: 3,  kern: -121.912 }, // space
  { gid: 54, kern: -121.82 },  // S
  { gid: 40, kern: -121.803 }, // E
  { gid: 53, kern: -121.812 }, // R
  { gid: 57, kern: -121.778 }, // V
  { gid: 44, kern: -121.923 }, // I
  { gid: 38, kern: -121.752 }, // C
  { gid: 40, kern: -121.803 }, // E
  { gid: 54, kern: 0 }         // S
];

let curX2 = 1262.1;
let facPaths = [];
for (let item of s2Items) {
  const glyph = glacialTTF.glyphs[item.gid] || { d: '', advanceWidth: 270 };
  const scale = 114.164 / 1000;
  if (glyph.d) {
    facPaths.push(`<path d="${glyph.d.trim()}" transform="translate(${curX2.toFixed(3)}, 877.457) scale(${scale.toFixed(6)})" />`);
  }
  curX2 += (glyph.advanceWidth / 1000) * 114.164 + (-item.kern / 1000) * 114.164;
}

// Make sure output directories exist
if (!fs.existsSync('public')) fs.mkdirSync('public', { recursive: true });
if (!fs.existsSync('public/images')) fs.mkdirSync('public/images', { recursive: true });

// Colors
const COLOR_NAVY = '#083863';
const COLOR_CYAN = '#00acea';

// 1. Full logo (centered, transparent background, bounding box tight)
// Let's check bounding box of whole artwork:
// X: min 1150 (emblem), max 2600 (emblem)
// Text 1: X 1544 to 2205, Y 1097 to 1350
// Text 2: X 1262 to 2443, Y 877 to 960
// Overall artwork: X: 1140 to 2600, Y in PDF: 840 to 2960.
// Height in PDF: 2960 - 840 = 2120
// Width: 2600 - 1140 = 1460
// Center X = 1875
// In flipped SVG space:
// SVG Y range: (3750 - 2960 = 790) to (3750 - 840 = 2910), height = 2120
// Let's create:
// A) Full square viewBox="0 0 3750 3750" (original composition)
const fullSquareSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3750 3750" width="100%" height="100%">
  <g transform="translate(0, 3750) scale(1, -1)">
    <!-- Emblem Navy -->
    <path fill="${COLOR_NAVY}" fill-rule="evenodd" d="${svgEmblemNavy}" />
    <!-- Emblem Cyan -->
    <path fill="${COLOR_CYAN}" fill-rule="evenodd" d="${svgEmblemCyan}" />
    <!-- SIV Text -->
    <g fill="${COLOR_NAVY}">
      ${sivPaths.join('\n      ')}
    </g>
    <!-- FACILITY SERVICES Text -->
    <g fill="${COLOR_NAVY}">
      ${facPaths.join('\n      ')}
    </g>
  </g>
</svg>`;
fs.writeFileSync('public/images/logo-square.svg', fullSquareSvg);
console.log('Saved public/images/logo-square.svg');

// B) Tight cropped full logo (X: 1140 to 2600, Y: 780 to 2920)
// Width: 1470, Height: 2140
const fullCroppedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1140 780 1470 2140" width="100%" height="100%">
  <g transform="translate(0, 3750) scale(1, -1)">
    <path fill="${COLOR_NAVY}" fill-rule="evenodd" d="${svgEmblemNavy}" />
    <path fill="${COLOR_CYAN}" fill-rule="evenodd" d="${svgEmblemCyan}" />
    <g fill="${COLOR_NAVY}">
      ${sivPaths.join('\n      ')}
    </g>
    <g fill="${COLOR_NAVY}">
      ${facPaths.join('\n      ')}
    </g>
  </g>
</svg>`;
fs.writeFileSync('public/images/logo.svg', fullCroppedSvg);
console.log('Saved public/images/logo.svg');

// C) Full logo in White/Cyan for dark backgrounds (Footer)
const fullWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1140 780 1470 2140" width="100%" height="100%">
  <g transform="translate(0, 3750) scale(1, -1)">
    <path fill="#ffffff" fill-rule="evenodd" d="${svgEmblemNavy}" />
    <path fill="${COLOR_CYAN}" fill-rule="evenodd" d="${svgEmblemCyan}" />
    <g fill="#ffffff">
      ${sivPaths.join('\n      ')}
    </g>
    <g fill="${COLOR_CYAN}">
      ${facPaths.join('\n      ')}
    </g>
  </g>
</svg>`;
fs.writeFileSync('public/images/logo-white.svg', fullWhiteSvg);
console.log('Saved public/images/logo-white.svg');

// D) Standalone Emblem (tightly cropped: 1140 780 1470 1520)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1140 780 1470 1520" width="100%" height="100%">
  <g transform="translate(0, 3750) scale(1, -1)">
    <path fill="${COLOR_NAVY}" fill-rule="evenodd" d="${svgEmblemNavy}" />
    <path fill="${COLOR_CYAN}" fill-rule="evenodd" d="${svgEmblemCyan}" />
  </g>
</svg>`;
fs.writeFileSync('public/images/logo-icon.svg', iconSvg);
console.log('Saved public/images/logo-icon.svg');

// E) Standalone Emblem White
const iconWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="1140 780 1470 1520" width="100%" height="100%">
  <g transform="translate(0, 3750) scale(1, -1)">
    <path fill="#ffffff" fill-rule="evenodd" d="${svgEmblemNavy}" />
    <path fill="${COLOR_CYAN}" fill-rule="evenodd" d="${svgEmblemCyan}" />
  </g>
</svg>`;
fs.writeFileSync('public/images/logo-icon-white.svg', iconWhiteSvg);
console.log('Saved public/images/logo-icon-white.svg');

// F) Also create a test preview HTML to view them all
const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Logo SVG Previews</title>
  <style>
    body { font-family: sans-serif; background: #f1f5f9; padding: 40px; margin: 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto; }
    .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center; }
    .card.dark { background: #083863; color: white; }
    .card h3 { margin-top: 0; margin-bottom: 16px; font-size: 16px; }
    .svg-wrap { height: 180px; display: flex; align-items: center; justify-content: center; }
    .svg-wrap svg { max-height: 100%; max-width: 100%; object-fit: contain; }
  </style>
</head>
<body>
  <h1 style="text-align: center; color: #083863; margin-bottom: 32px;">Logo SVG Verification</h1>
  <div class="grid">
    <div class="card">
      <h3>Full Logo (Tight Cropped)</h3>
      <div class="svg-wrap">${fullCroppedSvg}</div>
    </div>
    <div class="card dark">
      <h3>Full Logo White (Dark BG)</h3>
      <div class="svg-wrap">${fullWhiteSvg}</div>
    </div>
    <div class="card">
      <h3>Emblem Icon</h3>
      <div class="svg-wrap">${iconSvg}</div>
    </div>
    <div class="card dark">
      <h3>Emblem Icon White</h3>
      <div class="svg-wrap">${iconWhiteSvg}</div>
    </div>
    <div class="card">
      <h3>Full Square (Original Canvas)</h3>
      <div class="svg-wrap">${fullSquareSvg}</div>
    </div>
  </div>
</body>
</html>`;
fs.writeFileSync('public/images/preview.html', html);
console.log('Saved public/images/preview.html');
