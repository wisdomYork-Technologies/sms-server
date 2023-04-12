import Joi from "joi";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { APP_SECRET } from "../../config/DbConfig";
import { AuthPayload } from "./interface.dto";

export const registerSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(new RegExp("[ A-Za-z0-9_@./#&+-]*$"))
    .min(8)
    .required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" })
    .required(),
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
  return jwt.verify(signature, APP_SECRET) as JwtPayload;
};

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};
