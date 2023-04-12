import nodemailer from "nodemailer";
import {
  FromAdminMail,
  GMAIL_PASS,
  GMAIL_USER,
  userSubject,
} from "../../config/DbConfig";

const transport = nodemailer.createTransport({
  service: "gmail" /*service and host are the same thing */,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const mailSent = async (
  from: string,
  to: string,
  subject: string,
  html: string
) => {
  try {
    const response = await transport.sendMail({
      from: FromAdminMail,
      to,
      subject: userSubject,
      html,
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const RegistrationEmail = (link: string): string => {
  let response = `
      <div style="max-width:700px;
      margin:auto;
      border:10px solid #ddd;
      padding:50px 20px;
      font-size: 110%;
      font-style: italics
      "> 
      <h2 style="text-align:center;
      text-transform:uppercase;
      color:teal;
      ">
      Welcome to CrowdPlay
      </h2>
      <p>Hi there, follow the link to verify your account. The link expires in 10 minutes.</p>
       ${link}
       <h3>DO NOT DISCLOSE TO ANYONE<h3>
       </div>
      `;
  return response;
};
