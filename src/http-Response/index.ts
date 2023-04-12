import { Response } from "express";
import { CLIENT_URL } from "../config/DbConfig";
import { LoginResponseData } from "../superAdmin/utils/interface.dto";

//Used for returning a success message after creating a resource in the databse
//** Used mainly in the repository *//
const SuccessfulResponse = (successMsg: string) => {
  return { message: successMsg };
};

const SuccessfullyLoggedIn = (data: LoginResponseData) => {
  return { message: data };
};

//Used to return error within the Services folder and the repository folders
const UserInputOrOutputError = (errMessage: any) => {
  return { Error: errMessage };
};

//Used mainly for catch blocks in the controller
const HttpServerError = (res: Response, errMessage: string, route: string) => {
  return {
    message: res.status(500).json({
      Error: errMessage,
      route,
    }),
  };
};

//Houses all final responses that will be returned to the client
const HttpUserStatus = (data: any, res: Response) => {
  //If a users account has been successfully created, return this to the client
  if (
    data.message ===
    "You have registered successfully, Check your email for verification"
  ) {
    return res.status(201).json({
      message: data.message,
    });
  }
  if (data.message === "Successfully verified user") {
    return res.redirect(301, `${CLIENT_URL}/login`);
  }

  if (data.message?.message === "You have successfully logged in") {
    return res.status(200).json(data.message);
  }

  //IF a USERINPUT error was encountered along the line, output the error
  else if (data.Error) {
    return res.status(400).json({
      Error: data.Error,
    });
  }
  //If the error is coming from the server, output this error
  return res.status(500).json({
    Error: "Internal Server error",
  });
};
export default {
  SuccessfulResponse,
  SuccessfullyLoggedIn,
  UserInputOrOutputError,
  HttpServerError,
  HttpUserStatus,
};
