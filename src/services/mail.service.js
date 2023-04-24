import config from "../config/config.js";
import nodemailer from "nodemailer";

const gmailConfig = {
  service: config.EMAIL_APP_SERVICE,
  auth: {
    user: config.EMAIL_APP,
    pass: config.EMAIL_APP_PASSWORD,
  },
  tls : { rejectUnauthorized: false }
};

const sendMail = async (to, subject, body) => {
  const transporter = nodemailer.createTransport(gmailConfig);

  const mailContent = {
    from: config.EMAIL_APP,
    to: to,
    subject: subject,
    html: body,
    attachments: [],
  };

  try {
    const response = await transporter.sendMail(mailContent);
    console.log("sendMail -> response ", response);
  } catch (error) {
    console.log("sendMail -> error ", error);
  }
};

export default sendMail;
