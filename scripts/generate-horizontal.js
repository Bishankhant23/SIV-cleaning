const fs = require('fs');
const { Resvg } = require('@resvg/resvg-js');

// Read the emblem SVG path
const iconSvg = fs.readFileSync('public/images/logo-icon.svg', 'utf8');
const innerG = iconSvg.slice(iconSvg.indexOf('<g transform'), iconSvg.lastIndexOf('</g>') + 4);

// Create horizontal SVG for SIV Cleaning
const horizSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 180" width="580" height="180">
  <!-- Emblem on left -->
  <g transform="translate(10, 10) scale(0.10526) translate(-1140, -780)">
    ${innerG}
  </g>
  
  <!-- Text on right -->
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif">
    <text x="180" y="95" font-size="52" font-weight="900" fill="#083863" letter-spacing="-0.5">
      SIV<tspan fill="#00acea">CLEANING</tspan>
    </text>
    <text x="182" y="135" font-size="20" font-weight="700" fill="#64748b" letter-spacing="4">
      COMMERCIAL &amp; FACILITY
    </text>
  </g>
</svg>`;

fs.writeFileSync('public/images/logo-horizontal.svg', horizSvg);

// White horizontal SVG for dark footer
const horizWhiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 180" width="580" height="180">
  <g transform="translate(10, 10) scale(0.10526) translate(-1140, -780)">
    ${innerG.replace(/#083863/g, '#ffffff')}
  </g>
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif">
    <text x="180" y="95" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="-0.5">
      SIV<tspan fill="#00acea">CLEANING</tspan>
    </text>
    <text x="182" y="135" font-size="20" font-weight="700" fill="#94a3b8" letter-spacing="4">
      COMMERCIAL &amp; FACILITY
    </text>
  </g>
</svg>`;

fs.writeFileSync('public/images/logo-horizontal-white.svg', horizWhiteSvg);

// Render both to PNG
function renderToPng(svgStr, pngPath, width) {
  const resvg = new Resvg(svgStr, { fitTo: { mode: 'width', value: width } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(pngPath, pngBuffer);
  console.log('Rendered ' + pngPath + ' (' + pngBuffer.length + ' bytes, ' + pngData.width + 'x' + pngData.height + ')');
}

renderToPng(horizSvg, 'public/images/logo-horizontal.png', 580);
renderToPng(horizWhiteSvg, 'public/images/logo-horizontal-white.png', 580);
