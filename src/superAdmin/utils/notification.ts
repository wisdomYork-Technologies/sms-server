import nodemailer from "nodemailer";
import {
  FromAdminMail,
  userSubject,
} from "../../config/DbConfig";
import dotenv from "dotenv";
import { EmailPayload } from "./interface.dto";
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


export const RegistrationEmail = (link: string, user: EmailPayload): string => {
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
      <p>Hi ${user.firstName}, thanks for signing up on our innovative School Management platform, 
      Please follow the link to verify your account. The link expires in 30 minutes.</p>
       ${link}

       <p>After verifying your account, you can use these details below to login to your account. 
       It is strongly recommended that you change your password after your first login.</p>

       <h3>Login Credentials</h3>
       <p>Email: ${user.email}</p>
       <p>Password (Case sensitive): ${user.password}</p>
       <h3>DO NOT DISCLOSE TO ANYONE<h3>
       </div>
      `;
  return response;
};
