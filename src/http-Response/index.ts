import { Response } from "express";
import { CLIENT_URL } from "../config/DbConfig";
import { LoginResponseData } from "../superAdmin/utils/interface.dto";
import { StatusCodes } from "http-status-codes";

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

class HttpUserStatus {
  CreateSuccess(data: any, res: Response) {
    return res.status(StatusCodes.CREATED).json({ message: data.message });
  }

  VerifiedSuccess(res: Response) {
    return res.redirect(StatusCodes.MOVED_PERMANENTLY, `${CLIENT_URL}/login`);
  }

  LoginSuccess({ message }: { message: string }, res: Response) {
    return res.status(StatusCodes.OK).json(message);
  }

  UserInputError({ Error }: { Error: string }, res: Response) {
    return res.status(StatusCodes.BAD_REQUEST).json({ Error });
  }

  ServerError(res: Response) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Error: "Internal Server error" });
  }
}

// //Houses all final responses that will be returned to the client
// const HttpUserStatusl = (data: any, res: Response) => {
//   //If a users account has been successfully created, return this to the client
//   if (
//     data.message ===
//     "You have registered successfully, Check your email for verification"
//   ) {
//     return res.status(201).json({
//       message: data.message,
//     });
//   }
//   if (data.message === "Successfully verified user") {
//     return res.redirect(301, `${CLIENT_URL}/login`);
//   }

//   if (data.message?.message === "You have successfully logged in") {
//     return res.status(200).json(data.message);
//   }

//   //IF a USERINPUT error was encountered along the line, output the error
//   else if (data.Error) {
//     return res.status(400).json({
//       Error: data.Error,
//     });
//   }
//   //If the error is coming from the server, output this error
//   return res.status(500).json({
//     Error: "Internal Server error",
//   });
// };

export default {
  SuccessfulResponse,
  SuccessfullyLoggedIn,
  UserInputOrOutputError,
  HttpServerError,
  HttpUserStatus,
};
