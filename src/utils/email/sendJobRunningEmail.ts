import nodemailer from "nodemailer";
import config from "../../config";

const sendJobRunningEmail = async (
  email: string,
  applicantName: string,
  jobTitle: string,
  employerEmail: string
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
    subject: `Your Job "${jobTitle}" is Now Running`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f6f8; padding: 20px; border-radius: 12px;">
      
      <!-- Header -->
      <div style="background-color: #0f766e; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: bold;">🚀 Job Running</h1>
        <p style="color: #d1fae5; margin: 8px 0 0 0; font-size: 16px;">${jobTitle}</p>
      </div>

      <!-- Body -->
      <div style="background-color: #ffffff; padding: 30px 25px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <p style="color: #374151; font-size: 16px; margin: 0 0 15px 0;">Hi ${applicantName},</p>

        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
          Good news! Your job <strong>${jobTitle}</strong> is now running. You can track its progress in your account.
        </p>

        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
          For more information or assistance, please contact the employer directly at 
          <a href="mailto:${employerEmail}" style="color: #0f766e; text-decoration: underline;">${employerEmail}</a>.
        </p>

        <p style="color: #4b5563; font-size: 16px;">Thank you for using Tradieez!</p>

        <!-- Footer -->
        <p style="color: #9ca3af; font-size: 14px; margin-top: 30px;">
          Regards,<br/>
          <strong>Tradieez Team</strong>
        </p>
      </div>
    </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendJobRunningEmail;
