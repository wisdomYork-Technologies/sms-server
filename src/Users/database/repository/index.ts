import { SuperAdminRepositoryDetails } from "./superRepository.dto";
import StatusResponseObject from "../../../http-Response/index";
import { GenerateSignature, validatePassword } from "../../utils/validator";
import { mailSent, RegistrationEmail } from "../../utils/notification";
import {
  CLIENT_URL,
  FromAdminMail,
  SERVER_URL,
} from "../../../config/DbConfig";
import { UserLogin } from "../../services/client-service.dto";
import db from "../../../models";

/**===================================== Register SuperAdmin ===================================== **/

const CreateSuperRepository = async (
  userInput: SuperAdminRepositoryDetails
) => {
  //check if the user exists
  const User = await db.Users.findOne({
    where: { email: userInput.email },
  });

  if (User) {
    return StatusResponseObject.UserInputOrOutputError("User already exist!");
  }

  //Create User
  let createdUser;

  if (!User) {
    createdUser = await db.Users.create({
      firstName: userInput.firstName,
      lastName: userInput.lastName,
      email: userInput.email,
      password: userInput.password,
      schoolName: userInput.schoolName,
      schoolLocation: userInput.schoolLocation,
      salt: userInput.salt,
      permissions: "owner",
    });
            
    if (!createdUser) {
      return StatusResponseObject.UserInputOrOutputError(
        "unable to create user"
      );
    }
    let signature = await GenerateSignature({
      id: createdUser.id,
      email: createdUser.email,
      verified: createdUser.verified,
    });

    //send Email to user
    const link = `Press <a href=${SERVER_URL}/super/verify/${signature}>here</a> to verify your account. Thanks.`;
    const html = RegistrationEmail(link, {
      firstName: createdUser.firstName,
      password: userInput.defPassword,
      email: createdUser.email,
    });
    await mailSent(
      FromAdminMail,
      createdUser.email,
      "Edu-Smart School Management System User Verification",
      html
    );

    //returning a response for successful creation
    return StatusResponseObject.SuccessfulResponse(
      "You have registered successfully, Check your email for verification"
    );
  }
};

/**===================================== Verify SuperAdmin ===================================== **/

const VerifySuperRepository = async (id: string) => {
  // Find the user with the matching verification token
  const user = await db.Users.findOne({ where: { id } });
  if (!user) {
    return StatusResponseObject.UserInputOrOutputError(
      "Invalid verification token"
    );
  }
  // Set the user's verified status to true
  const User = await db.Users.update(
    { verified: true },
    { where: { id } }
  );
  await user.save();
  // Redirect success message
  return StatusResponseObject.SuccessfulResponse("Successfully verified user");
};

const LoginRepository = async (userInput: UserLogin) => {
  //check if the user exist
  // const User = await db.Users.findOne({ email: userInput.email });
  // if (!User) {
  //   return StatusResponseObject.UserInputOrOutputError(
  //     "Incorrect login details"
  //   );
  // }
  // if (User.verified) {
  //   const validation = await validatePassword(
  //     userInput.password,
  //     User.password,
  //     User.salt
  //   );
  //   if (validation) {
  //     //Regenerate a signature
  //     let signature = await GenerateSignature({
  //       _id: User._id,
  //       email: User.email,
  //       verified: User.verified,
  //     });
  //     const responseData = {
  //       message: "You have successfully logged in",
  //       signature,
  //       email: User.email,
  //       verified: User.verified,
  //     };
  //     return StatusResponseObject.SuccessfullyLoggedIn(responseData);
  //   }
  //   return StatusResponseObject.UserInputOrOutputError(
  //     "Wrong Username or password"
  //   );
  // }
  // return StatusResponseObject.UserInputOrOutputError(
  //   "kindly verify your account"
  // );
};

export default {
  CreateSuperRepository,
  VerifySuperRepository,
  LoginRepository,
};
