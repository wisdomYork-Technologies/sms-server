import { Response } from "express";
import { CLIENT_URL } from "../config/DbConfig";
import { LoginResponseData } from "../Users/utils/interface.dto";
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
   
  }

  VerifiedSuccessOrFailure(data: any, res: Response) {
  
    if (data && "Error" in data) {
      return this.UserInputError(data, res);
    } else {
      return res.redirect(StatusCodes.MOVED_PERMANENTLY, `${CLIENT_URL}/login`);
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

export default {
  SuccessfulResponse,
  SuccessfullyLoggedIn,
  UserInputOrOutputError,
  HttpUserStatus,
};
