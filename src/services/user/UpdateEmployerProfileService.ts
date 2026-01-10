/* eslint-disable @typescript-eslint/no-explicit-any */
import { Secret } from "jsonwebtoken";
import config from "../../config";
import createToken, { TExpiresIn } from "../../utils/createToken";
import { IEmployer } from "../../interfaces/employer.interface";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import EmployerModel from "../../models/EmployerModel";

const UpdateEmployerProfileService = async (
  loginUserId: string,
  req: any,
  payload: Partial<IEmployer>) => {
  //if image is available
  if (req.file) {
    payload.profileImg = await uploadToCloudinary(
      req?.file?.path as string,
      "employer"
    );
  }

  //update the employer
  const result = await EmployerModel.findOneAndUpdate(
    { userId: loginUserId },
    payload,
    { returnDocument: "after" }
  ).select("fullName email profileImg");

  //create accessToken
  const accessToken = createToken(
    {
      userId: String(loginUserId),
      email: result?.email as string,
      fullName: result?.fullName as string,
      profileImg: result?.profileImg as string,
      role: "employer",
    },
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as TExpiresIn
  );

  return {
    accessToken,
  };
};

export default UpdateEmployerProfileService;
