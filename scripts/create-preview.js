const fs = require('fs');

const mailContent = fs.readFileSync('src/lib/mail.ts', 'utf8');

const adminHtmlMatch = mailContent.match(/const htmlContent = `([\s\S]*?)`;\s*const info = await transporter\.sendMail/);
const customerHtmlMatch = mailContent.match(/const htmlContent = `([\s\S]*?)`;\s*try \{\s*const info = await transporter\.sendMail/);

if (!adminHtmlMatch || !customerHtmlMatch) {
  console.log('Error: Could not extract templates');
  process.exit(1);
}

const sampleData = {
  name: 'Marcus Vance',
  phone: '0412 345 678',
  email: 'marcus.vance@example.com.au',
  service: 'Commercial Office Cleaning',
  suburb: 'Dandenong South',
  frequency: 'Weekly',
  message: 'We have a two-storey commercial office (approx 650 sqm) with 4 restrooms, kitchen pantry, and meeting rooms. Need daily after-hours sanitisation and weekly carpet care.'
};

const melbourneTime = new Date().toLocaleString('en-AU', {
  timeZone: 'Australia/Melbourne',
  dateStyle: 'full',
  timeStyle: 'short'
});

function replaceVars(template) {
  return template
    .replace(/\$\{data\.name\}/g, sampleData.name)
    .replace(/\$\{data\.phone\}/g, sampleData.phone)
    .replace(/\$\{data\.email\}/g, sampleData.email)
    .replace(/\$\{data\.service \|\| [^}]+\}/g, sampleData.service)
    .replace(/\$\{data\.suburb \|\| [^}]+\}/g, sampleData.suburb)
    .replace(/\$\{data\.frequency \|\| [^}]+\}/g, sampleData.frequency)
    .replace(/\$\{melbourneTime\}/g, melbourneTime)
    .replace(/\$\{\s*data\.message\s*\?[\s\S]*?: ''\s*\}/g, `<div style="margin-top: 24px;"><div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Client Message / Scope</div><div style="background-color: #f8fafc; border-left: 4px solid #00acea; border-radius: 0 8px 8px 0; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${sampleData.message}</div></div>`);
}

const adminRendered = replaceVars(adminHtmlMatch[1]);
const customerRendered = replaceVars(customerHtmlMatch[1]);

fs.writeFileSync('public/email-admin-preview.html', adminRendered);
fs.writeFileSync('public/email-customer-preview.html', customerRendered);

const showcase = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>SIV Cleaning — Email Templates Preview</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b192c; margin: 0; padding: 40px 20px; color: #ffffff; }
    h1 { text-align: center; margin: 0 0 8px 0; font-size: 26px; }
    p.subtitle { text-align: center; color: #94a3b8; margin: 0 0 36px 0; font-size: 14px; }
    .container { max-width: 1360px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    @media (max-width: 960px) { .container { grid-template-columns: 1fr; } }
    .col { background: #1e293b; border-radius: 16px; padding: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.3); border: 1px solid #334155; }
    .col-header { margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 14px; }
    .col-title { font-size: 16px; font-weight: 700; color: #00acea; }
    .badge { font-size: 11px; background: rgba(0,172,234,0.15); border: 1px solid #00acea; color: #00acea; padding: 4px 10px; border-radius: 20px; font-weight: 700; text-transform: uppercase; }
    iframe { width: 100%; height: 860px; border: none; border-radius: 12px; background: #f1f5f9; }
  </style>
</head>
<body>
  <h1>SIV Cleaning — Email Design Showcase</h1>
  <p class="subtitle">Live visual previews of both email templates sent by Nodemailer</p>

  <div class="container">
    <div class="col">
      <div class="col-header">
        <div class="col-title">1. Lead Notification Email (Sent to You)</div>
        <div class="badge">Recipient: bishanpatel123@gmail.com</div>
      </div>
      <iframe src="email-admin-preview.html"></iframe>
    </div>

    <div class="col">
      <div class="col-header">
        <div class="col-title">2. Customer Confirmation Receipt (Sent to Client)</div>
        <div class="badge">Recipient: Client</div>
      </div>
      <iframe src="email-customer-preview.html"></iframe>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync('public/email-preview.html', showcase);
console.log('Successfully generated public/email-preview.html and individual template previews!');
