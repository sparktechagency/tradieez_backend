import nodemailer from "nodemailer";
import config from "../../config";

const sendApplicationAcceptedEmail = async (
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
    subject: `Application Accepted – ${jobTitle}`,
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      
      <!-- Header -->
      <div style="background-color: #16a34a; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
          Application Accepted 🎉
        </h1>
        <p style="color: #dcfce7; margin: 8px 0 0 0; font-size: 16px;">
          ${jobTitle}
        </p>
      </div>

      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
        
        <p style="color: #374151; margin: 0 0 20px 0; font-size: 16px;">
          Hello ${applicantName},
        </p>

        <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          <strong>${employerName}</strong> has accepted your application for the position of
          <strong>${jobTitle}</strong>.
        </p>
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

export default sendApplicationAcceptedEmail;
