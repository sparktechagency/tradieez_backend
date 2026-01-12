import nodemailer from "nodemailer";
import config from "../../config";

const sendApplicationRejectedEmail = async (
  email: string,
  applicantName: string,
  employerName: string,
  jobTitle: string
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
    subject: `Application Rejected – ${jobTitle}`,
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      
      <!-- Header -->
      <div style="background-color: #6b7280; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
          Application Rejected
        </h1>
        <p style="color: #e5e7eb; margin: 8px 0 0 0; font-size: 16px;">
          ${jobTitle}
        </p>
      </div>

      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
        
        <p style="color: #374151; margin: 0 0 20px 0; font-size: 16px;">
          Hello ${applicantName},
        </p>

        <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          Thank you for taking the time to apply for the position of
          <strong>${jobTitle}</strong> with <strong>${employerName}</strong>.
        </p>

        <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          After careful consideration, we regret to inform you that your application has not been selected at this time.
        </p>

        <!-- Encouragement Box -->
        <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="color: #374151; margin: 0 0 12px 0; font-size: 15px; font-weight: 600;">
            Please don’t be discouraged
          </p>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">
            We encourage you to keep your profile updated and apply for other opportunities that match your skills and experience.
          </p>
        </div>
        <p style="color: #6b7280; margin-top: 30px; font-size: 14px;">
          We appreciate your interest and wish you the very best in your job search.<br/><br/>
          Kind regards,<br/>
          <strong>Tradieez Team</strong>
        </p>
      </div>
    </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendApplicationRejectedEmail;
