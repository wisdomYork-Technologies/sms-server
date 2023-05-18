import Joi from "joi";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { APP_SECRET } from "../../config/DbConfig";
import { AuthPayload } from "./interface.dto";

export const registerSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string(),
  address: Joi.string(),
  schoolName: Joi.string().required(),
  schoolLocation: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .label("email")
    .messages({ "string.only": "{{#label}} must be a valid email" }),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string(),
});

export const option = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const GenerateSignature = async (payload: AuthPayload) => {
  try {
    return jwt.sign(payload, APP_SECRET, { expiresIn: "1d" });
  } catch (error) {
    throw "could not create a token";
  } /*1d means 1 day */
};

export const verifySignature = async (signature: string) => {
  try {
    return jwt.verify(signature, APP_SECRET) as AuthPayload;
  } catch (error: any) {
    return "error in verifying token";
  }
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const generateRandomNum = () => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber;
};
