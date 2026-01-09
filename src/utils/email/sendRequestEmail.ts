import nodemailer from "nodemailer";
import config from "../../config";

const sendRequestEmail = async (
  email: string,
  requesterName: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.smtp_username,
      pass: config.smtp_password,
    },
  });

  const mailOptions = {
    from: `Tradieez Service ${config.smtp_from}`,
    to: email,
    subject: "Profile Access Request – Action Required",
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      
      <!-- Header -->
      <div style="background-color: #1f2937; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
          Tradieez Service
        </h1>
        <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 16px;">
          Profile Visibility Notice
        </p>
      </div>

      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
        
        <p style="color: #374151; margin: 0 0 20px 0; font-size: 16px;">
          Hello,
        </p>

        <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          <strong>${requesterName}</strong> has requested access to view your profile.
          However, your profile is currently set to <strong>Private</strong>.
        </p>

        <!-- Info Box -->
        <div style="background-color: #f3f4f6; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="color: #374151; margin: 0 0 12px 0; font-size: 15px; font-weight: 600;">
            Why make your profile public?
          </p>
          <ul style="color: #6b7280; font-size: 14px; padding-left: 18px; margin: 0;">
            <li>Get discovered by employers</li>
            <li>Receive more work opportunities</li>
            <li>Allow others to view your skills & experience</li>
          </ul>
        </div>

        <!-- Action Notice -->
        <div style="background-color: #ecfeff; border: 1px solid #67e8f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="color: #155e75; margin: 0; font-size: 14px; font-weight: 500;">
            👉 Please log in to your account and make your profile <strong>Public</strong> to approve this request.
          </p>
        </div>
        <p style="color: #6b7280; margin-top: 30px; font-size: 14px;">
          Best regards,<br/>
          <strong>Tradieez Team</strong>
        </p>
      </div>
    </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendRequestEmail;
