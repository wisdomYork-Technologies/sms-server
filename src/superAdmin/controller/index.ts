import express, { Request, Response } from "express";
import SuperAdminServices from "../services/index";
import HttpResponse from "../../http-Response";
import { JwtPayload } from "jsonwebtoken";

const SuperAdminRegister = async (req: Request, res: Response) => {
  const httpResponse = new HttpResponse.HttpUserStatus();
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
    } = req.body;
    const data = await SuperAdminServices.CreateSuperAdmin({
      firstName,
      lastName,
      email,
      password,
      confirm_password,
    });
    if (data && "Error" in data) {
      return httpResponse.UserInputError(data, res)
    }
    //Return response
    return httpResponse.CreateSuccess(data, res);

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      Error: "server error"
    })
    // HttpResponse.HttpServerError(res, error, "/superAdmin/signup");
  }
};

/**==================== Verify Users ========================**/
const VerifySuperAdmin = async (req: JwtPayload, res: Response) => {
    // try {
    //   const token = req.params.signature;

    //   //Send the token to UserServices for verification
    //   const data = await SuperAdminServices.VerifySuperAdminService(token);
    //   //Return response
    //   return HttpResponse.HttpUserStatus(data, res);
  
    // } catch (error: any) {
    //     console.log(error);
    //     return HttpResponse.HttpServerError(res, error, "/SuperAdmin/verify");
    // }
  };

/**==================== Login User ========================**/
const SuperAdminLogin = async (req: Request, res: Response) => {
    // try {
    //   const { email, password } = req.body;
    //   //Send the payload to the user service
    //   const data = await SuperAdminServices.LoginSuperAdminService({email, password});
    //   return HttpResponse.HttpUserStatus(data, res);

    // } catch (error: any) {
    //     console.log(error);
    //     return HttpResponse.HttpServerError(res, error, "/super/login");
    // }
  };




export default {
 SuperAdminRegister,
  VerifySuperAdmin,
 SuperAdminLogin
};
