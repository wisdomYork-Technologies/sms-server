import {
  GeneratePassword,
  GenerateSalt,
  loginSchema,
  option,
  registerSchema,
  verifySignature,
} from "../utils/validator";
import { UserRegister, UserLogin } from "./client-service.dto";
import ErrorObject from "../../http-Response/index";
import ClientRepository from "../database/repository/index";
import { SuperAdminModel } from "../database/models/Client";

const CreateSuperAdmin = async (userDetails: UserRegister) => {
  //validate input
  const validateResult = registerSchema.validate(userDetails, option);
  if (validateResult.error) {
    return ErrorObject.UserInputOrOutputError(
      validateResult.error.details[0].message
    );
  }

  //generate salt
  const salt = await GenerateSalt();
  //hash password
  const userPassword = await GeneratePassword(userDetails.password, salt);

  //Spread the object in order to insert the newly hashed password and the generated salt.
  const newUser = { ...userDetails, password: userPassword, salt };
  //send to repository to be created
  const createdUser = await ClientRepository.CreateUserRepository(newUser);
  return createdUser;
};

const VerifySuperAdminService = async (token: string) => {
     // Verify the signature
     const { _id, email, verified } = await verifySignature(token);
     
     //Send the Id to the Client repository for verification.
     const verifyUser = await ClientRepository.VerifyUserRepository(_id)
     return verifyUser;
  
}

const LoginSuperAdminService = async (userInput: UserLogin) => {
    //Validate User Input
    const validateResult = loginSchema.validate(userInput, option);
      if (validateResult.error) {
        return ErrorObject.UserInputOrOutputError(
            validateResult.error.details[0].message
          );
      }

    const loginUser = await ClientRepository.LoginRepository(userInput)
    return loginUser;
}
export default {
  CreateSuperAdmin,
  VerifySuperAdminService,
  LoginSuperAdminService
};
