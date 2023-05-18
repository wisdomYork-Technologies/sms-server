import {
  GeneratePassword,
  generateRandomNum,
  GenerateSalt,
  loginSchema,
  option,
  registerSchema,
  verifySignature,
} from "../utils/validator";
import { UserRegister, UserLogin } from "./client-service.dto";
import ErrorObject from "../../http-Response/index";
import SuperRepository from "../database/repository/index";

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
  //Generate default password
  const defaultPassword = `Vjx*${generateRandomNum()}${
    userDetails.schoolName[0]
  }${generateRandomNum()}`;

  //hash password
  const userPassword = await GeneratePassword(defaultPassword, salt);
  //Spread the object in order to insert the newly hashed password and the generated salt.
  const newUser = {
    ...userDetails,
    password: userPassword,
    defPassword: defaultPassword,
    salt,
  };
  //send to repository to be created
  const createdUser = await SuperRepository.CreateSuperRepository(newUser);
  return createdUser;
};

const VerifySuperAdminService = async (token: string) => {
  // Verify the signature
  const authPayloadOrError = await verifySignature(token);
  if (typeof authPayloadOrError === "string") {
    // Handle the error case
    return ErrorObject.UserInputOrOutputError(authPayloadOrError);
  }
  const { id, email, verified } = authPayloadOrError; //Send the Id to the Client repository for verification.
  const verifyUser = await SuperRepository.VerifySuperRepository(id);
  return verifyUser;
};

const LoginSuperAdminService = async (userInput: UserLogin) => {
  //Validate User Input
  // const validateResult = loginSchema.validate(userInput, option);
  // if (validateResult.error) {
  //   return ErrorObject.UserInputOrOutputError(
  //     validateResult.error.details[0].message
  //   );
  // }
  // const loginUser = await SuperRepository.LoginRepository(userInput);
  // return loginUser;
};
export default {
  CreateSuperAdmin,
  VerifySuperAdminService,
  LoginSuperAdminService,
};
