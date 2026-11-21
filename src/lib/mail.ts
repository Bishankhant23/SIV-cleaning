import nodemailer from 'nodemailer';

export interface QuoteEmailData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  suburb?: string;
  frequency?: string;
  message?: string;
}

// Create reusable transporter
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send beautifully designed lead notification email to the business owner
 */
export async function sendQuoteNotification(data: QuoteEmailData) {
  const transporter = getTransporter();
  const recipient =
    process.env.SMTP_TO ||
    process.env.CONTACT_RECEIVER_EMAIL ||
    process.env.NOTIFICATION_EMAIL ||
    process.env.SMTP_USER ||
    'info@sivcleaning.com.au';
  const from =
    process.env.SMTP_FROM ||
    process.env.FROM_EMAIL ||
    `"SIV Cleaning Website" <${process.env.SMTP_USER || 'no-reply@sivcleaning.com.au'}>`;

  if (!transporter) {
    console.warn(
      '[Email Service Warning]: SMTP_USER or SMTP_PASS not set in .env.local. Skipping email dispatch.'
    );
    return { success: false, simulated: true, message: 'SMTP credentials missing in .env.local' };
  }

  const melbourneTime = new Date().toLocaleString('en-AU', {
    timeZone: 'Australia/Melbourne',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Quote Request</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(8, 56, 99, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Banner -->
          <tr>
            <td height="6" style="background: linear-gradient(90deg, #083863 0%, #00acea 50%, #00efd1 100%); line-height: 6px; font-size: 6px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color: #083863; padding: 32px 36px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <span style="font-size: 26px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff; text-decoration: none;">
                      SIV<span style="color: #00acea;">CLEANING</span>
                    </span>
                    <div style="margin-top: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; font-weight: 700;">
                      Commercial & Facility Cleaning
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: rgba(0, 172, 234, 0.15); border: 1px solid rgba(0, 172, 234, 0.4); color: #00acea; padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
                      ⚡ New Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action Bar: Call & Reply Buttons -->
          <tr>
            <td style="background-color: #05233e; padding: 16px 36px; border-bottom: 1px solid rgba(255,255,255,0.08);">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #ffffff; font-size: 13px; font-weight: 600;">
                    Quick Actions:
                  </td>
                  <td align="right">
                    <a href="tel:${data.phone}" style="display: inline-block; background-color: #00acea; color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none; margin-right: 8px;">
                      📞 Call ${data.phone}
                    </a>
                    <a href="mailto:${data.email}?subject=Regarding%20your%20SIV%20Cleaning%20Quote" style="display: inline-block; background-color: rgba(255,255,255,0.12); color: #ffffff; padding: 8px 16px; border-radius: 8px; font-size: 12px; font-weight: 700; text-decoration: none; border: 1px solid rgba(255,255,255,0.2);">
                      ✉️ Reply Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 36px 24px 36px;">
              <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #083863;">
                Quote Inquiry Details
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                A new quote request has just been submitted via the website. Details are provided below:
              </p>

              <!-- Data Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                
                <!-- Client Name -->
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td width="35%" style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc;">
                    Client Name
                  </td>
                  <td width="65%" style="padding: 14px 18px; font-size: 15px; font-weight: 700; color: #083863;">
                    ${data.name}
                  </td>
                </tr>

                <!-- Phone Number -->
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc;">
                    Phone Number
                  </td>
                  <td style="padding: 14px 18px; font-size: 15px; font-weight: 700; color: #00acea;">
                    <a href="tel:${data.phone}" style="color: #00acea; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>

                <!-- Email Address -->
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc;">
                    Email Address
                  </td>
                  <td style="padding: 14px 18px; font-size: 14px; font-weight: 600; color: #083863;">
                    <a href="mailto:${data.email}" style="color: #083863; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>

                <!-- Service Required -->
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc;">
                    Service
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-block; background-color: #e0f2fe; color: #0284c7; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 700;">
                      ${data.service || 'Commercial Office Cleaning'}
                    </span>
                  </td>
                </tr>

                <!-- Suburb / Location -->
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc;">
                    Suburb / Location
                  </td>
                  <td style="padding: 14px 18px; font-size: 14px; font-weight: 600; color: #083863;">
                    📍 ${data.suburb || 'Melbourne South East'}
                  </td>
                </tr>

                <!-- Frequency -->
                <tr>
                  <td style="padding: 14px 18px; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; background-color: #f8fafc;">
                    Frequency
                  </td>
                  <td style="padding: 14px 18px;">
                    <span style="display: inline-block; background-color: #fef3c7; color: #b45309; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 700;">
                      🗓️ ${data.frequency || 'Weekly'}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Message / Scope Box (if provided) -->
              ${
                data.message
                  ? `
                <div style="margin-top: 24px;">
                  <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                    Client Message / Scope
                  </div>
                  <div style="background-color: #f8fafc; border-left: 4px solid #00acea; border-radius: 0 8px 8px 0; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
                    ${data.message}
                  </div>
                </div>
                `
                  : ''
              }
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 36px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
                Timestamp: <strong>${melbourneTime}</strong>
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                This notification was generated automatically by the SIV Cleaning website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const info = await transporter.sendMail({
    from,
    to: recipient,
    replyTo: data.email,
    subject: `🔔 New Cleaning Quote: ${data.name} — ${data.service || 'Commercial Cleaning'} (${data.suburb || 'Melbourne'})`,
    text: `NEW QUOTE REQUEST\n\nClient Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nService: ${data.service || 'Commercial Cleaning'}\nSuburb: ${data.suburb || 'Melbourne'}\nFrequency: ${data.frequency || 'Weekly'}\n\nMessage:\n${data.message || 'No additional message.'}\n\nSubmitted on: ${melbourneTime}`,
    html: htmlContent,
  });

  return { success: true, messageId: info.messageId };
}

/**
 * Send professional confirmation receipt to the customer
 */
export async function sendCustomerConfirmation(data: QuoteEmailData) {
  const transporter = getTransporter();
  const from =
    process.env.SMTP_FROM ||
    process.env.FROM_EMAIL ||
    `"SIV Cleaning" <${process.env.SMTP_USER || 'info@sivcleaning.com.au'}>`;

  if (!transporter || !data.email) {
    return { success: false, simulated: true };
  }

  const htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quote Request Received — SIV Cleaning</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f1f5f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(8, 56, 99, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Top Accent Banner -->
          <tr>
            <td height="6" style="background: linear-gradient(90deg, #083863 0%, #00acea 50%, #00efd1 100%); line-height: 6px; font-size: 6px;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="background-color: #083863; padding: 36px 36px; text-align: center;">
              <span style="font-size: 28px; font-weight: 900; letter-spacing: -0.5px; color: #ffffff;">
                SIV<span style="color: #00acea;">CLEANING</span>
              </span>
              <p style="margin: 8px 0 0; font-size: 13px; color: #fedb41; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                Experience the Difference Quality Makes
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 800; color: #083863;">
                Thank You, ${data.name}!
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 15px; color: #475569; line-height: 1.6;">
                We have received your commercial cleaning request and our Melbourne supervisory team is reviewing your requirements.
              </p>

              <!-- Request Summary Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 28px; padding: 18px 20px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 8px;">
                      Your Inquiry Summary
                    </div>
                    <div style="font-size: 14px; color: #083863; margin-bottom: 6px;">
                      <strong>Service:</strong> ${data.service || 'Commercial Office Cleaning'}
                    </div>
                    <div style="font-size: 14px; color: #083863; margin-bottom: 6px;">
                      <strong>Suburb:</strong> ${data.suburb || 'Melbourne South East'}
                    </div>
                    <div style="font-size: 14px; color: #083863;">
                      <strong>Frequency:</strong> ${data.frequency || 'Weekly'}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next: 3 Steps -->
              <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 800; color: #083863;">
                What Happens Next?
              </h3>

              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td width="36" valign="top" style="padding-right: 12px;">
                    <div style="width: 28px; height: 28px; background-color: #e0f2fe; color: #0284c7; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 800; font-size: 13px;">
                      1
                    </div>
                  </td>
                  <td valign="top" style="padding-bottom: 14px;">
                    <strong style="color: #083863; font-size: 14px;">Scope Assessment:</strong>
                    <div style="font-size: 13px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                      Our team assesses your premises specifications, square footage, and hygiene needs.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td width="36" valign="top" style="padding-right: 12px;">
                    <div style="width: 28px; height: 28px; background-color: #e0f2fe; color: #0284c7; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 800; font-size: 13px;">
                      2
                    </div>
                  </td>
                  <td valign="top" style="padding-bottom: 14px;">
                    <strong style="color: #083863; font-size: 14px;">Fast Contact (Within 2–4 Hours):</strong>
                    <div style="font-size: 13px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                      A supervisor will contact you via phone or email to discuss any details or schedule a free on-site walkthrough.
                    </div>
                  </td>
                </tr>

                <tr>
                  <td width="36" valign="top" style="padding-right: 12px;">
                    <div style="width: 28px; height: 28px; background-color: #e0f2fe; color: #0284c7; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 800; font-size: 13px;">
                      3
                    </div>
                  </td>
                  <td valign="top">
                    <strong style="color: #083863; font-size: 14px;">Tailored Proposal:</strong>
                    <div style="font-size: 13px; color: #64748b; line-height: 1.4; margin-top: 2px;">
                      You receive a transparent, itemized quote with no hidden lock-in contracts.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Urgent Callout Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 12px; padding: 18px 20px;">
                <tr>
                  <td>
                    <div style="font-size: 13px; font-weight: 700; color: #0369a1; margin-bottom: 4px;">
                      Need immediate cleaning assistance?
                    </div>
                    <div style="font-size: 13px; color: #475569;">
                      Speak directly to our operations manager at <a href="tel:0432452788" style="color: #00acea; font-weight: 800; text-decoration: none;">04 3245 2788</a> or reply to this email.
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Trust Badges & Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 36px; border-top: 1px solid #e2e8f0; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                  <td align="center" style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
                    ✓ $20M Public Liability &nbsp;•&nbsp; ✓ Police Cleared &nbsp;•&nbsp; ✓ Working With Children Checked
                  </td>
                </tr>
              </table>
              <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                SIV Cleaning — Commercial &amp; Facility Cleaning Across Melbourne South East<br />
                <a href="mailto:info@sivcleaning.com.au" style="color: #00acea; text-decoration: none;">info@sivcleaning.com.au</a> &nbsp;|&nbsp; <a href="tel:0432452788" style="color: #00acea; text-decoration: none;">04 3245 2788</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from,
      to: data.email,
      subject: `We've received your cleaning quote request! — SIV Cleaning Melbourne`,
      text: `Hi ${data.name},\n\nThank you for requesting a commercial cleaning quote from SIV Cleaning Melbourne.\n\nWe have received your details for ${data.service || 'Commercial Cleaning'} in ${data.suburb || 'Melbourne'}.\n\nWhat happens next?\n1. Scope Assessment: Our team reviews your requirements.\n2. Fast Contact: A supervisor will call or email you within 2–4 hours.\n3. Tailored Proposal: You receive a transparent quote with zero lock-in contracts.\n\nIf your request is urgent, please call us directly at 04 3245 2788.\n\nWarm regards,\nThe SIV Cleaning Team\ninfo@sivcleaning.com.au | 04 3245 2788`,
      html: htmlContent,
    });
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('Error sending customer confirmation:', err);
    return { success: false, error: err };
  }
}
