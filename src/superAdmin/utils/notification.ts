import nodemailer from "nodemailer";
import {
  FromAdminMail,
  userSubject,
} from "../../config/DbConfig";
import dotenv from "dotenv";
dotenv.config();


const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
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
    // response.accepted
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const RegistrationEmail = (link: string, user: string): string => {
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
      Welcome to Edu-Smart School Management System
      </h2>
      <p>Hi ${user}, thanks for signing up on our innovative School Management platform, 
      Please follow the link to verify your account. The link expires in 30 minutes.</p>
       ${link}
       <h3>DO NOT DISCLOSE TO ANYONE<h3>
       </div>
      `;
  return response;
};
