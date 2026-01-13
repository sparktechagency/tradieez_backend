import nodemailer from "nodemailer";
import config from "../../config";

const sendApplicationCancelledEmail = async (
  email: string,
  applicantName: string,
  employerName: string,
  employerEmail: string,
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
    subject: `Application Cancelled – ${jobTitle}`,
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      
      <!-- Header -->
      <div style="background-color: #dc2626; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
           Application Cancelled
        </h1>
        <p style="color: #fee2e2; margin: 8px 0 0 0; font-size: 16px;">
           ${jobTitle}
        </p>
      </div>

      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
        
        <p style="color: #374151; margin: 0 0 20px 0; font-size: 16px;">
          Hello ${applicantName},
        </p>

        <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          This is to inform you that your application for the position of
          <strong>${jobTitle}</strong> with <strong>${employerName}</strong> has been cancelled.
        </p>
        <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          For more information, please contact the employer directly at 
          <a href="mailto:${employerEmail}" style="color: #dc2626; text-decoration: underline;">${employerEmail}</a>.
        </p>
        <p style="color: #6b7280; margin-top: 30px; font-size: 14px;">
          Thank you for your understanding.<br/><br/>
          Best regards,<br/>
          <strong>Tradieez Team</strong>
        </p>
      </div>
    </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendApplicationCancelledEmail;
