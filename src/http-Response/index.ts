import { Response } from "express";
import { CLIENT_URL } from "../config/DbConfig";
import { LoginResponseData } from "../superAdmin/utils/interface.dto";
import { StatusCodes } from "http-status-codes";

//Used for returning a success message after creating a resource in the database
//** Used mainly in the repository *//
const SuccessfulResponse = (successMsg: string) => {
  return { message: successMsg };
};

//Used for returning a success message with some details in the repository
const SuccessfullyLoggedIn = (data: LoginResponseData) => {
  return { message: data };
};

//Used to return error within the Services folder and the repository folders
const UserInputOrOutputError = (errMessage: any) => {
  return { Error: errMessage };
};


class HttpUserStatus {
  CreateSuccessOrFailure(data: any, res: Response) {
    if (data && "Error" in data) {
      return this.UserInputError(data, res);
    } else {
      return res.status(StatusCodes.CREATED).json({ message: data.message });
    }
    // const successResponse = res
    //   .status(StatusCodes.CREATED)
    //   .json({ message: data.message });
    // console.log("success is ", successResponse)
    // userInputErrorHandler(data, res, successResponse);
  }

  VerifiedSuccessOrFailure(data: any, res: Response) {
    // const successRedirect = res.redirect(
    //   StatusCodes.MOVED_PERMANENTLY,
    //   `${CLIENT_URL}/login`
    // );
 if (data && "Error" in data) {
   return this.UserInputError(data, res);
 } else {
   return res.redirect(StatusCodes.MOVED_PERMANENTLY, `${CLIENT_URL}/login`);;
 }
    // userInputErrorHandler(data, res, successRedirect);
  }

  LoginSuccess({ message }: { message: string }, res: Response) {
    return res.status(StatusCodes.OK).json(message);
  }

  UserInputError({ Error }: { Error: string }, res: Response) {
    return res.status(StatusCodes.BAD_REQUEST).json({ Error });
  }

  //Used mainly for catch blocks in the controller

  ServerError(res: Response, error: any, route: string) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Error: "Internal Server error", error, route });
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
  HttpUserStatus,
};
