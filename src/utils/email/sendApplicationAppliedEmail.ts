import nodemailer from "nodemailer";
import config from "../../config";

const sendApplicationAppliedEmail = async (
  employerEmail: string,
  candidateName: string,
  candidateEmail: string,
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
    to: employerEmail,
    subject: `New Application Received – ${jobTitle}`,
    html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
      
      <!-- Header -->
      <div style="background-color: #2563eb; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
          New Job Application 📩
        </h1>
        <p style="color: #dbeafe; margin: 8px 0 0 0; font-size: 16px;">
          ${jobTitle}
        </p>
      </div>

      <!-- Main Content -->
      <div style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
        
        <p style="color: #374151; margin: 0 0 20px 0; font-size: 16px;">
          Hello,
        </p>

        <p style="color: #6b7280; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
          A new candidate has applied for the position of <strong>${jobTitle}</strong>.
        </p>

        <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 0; color: #374151; font-size: 15px;">
            <strong>Candidate Name:</strong> ${candidateName}
          </p>
          <p style="margin: 8px 0 0 0; color: #374151; font-size: 15px;">
            <strong>Candidate Email:</strong> ${candidateEmail}
          </p>
        </div>

        <p style="color: #6b7280; font-size: 14px;">
          Please log in to your Tradieez dashboard to review the application.
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

export default sendApplicationAppliedEmail;
