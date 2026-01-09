/* eslint-disable @typescript-eslint/no-explicit-any */
import { Secret } from "jsonwebtoken";
import CustomError from "../../errors/CustomError";
import { IUpdateCandidatePayload } from "../../interfaces/candidate.interface";
import CandidateModel from "../../models/CandidateModel";
import SubCategoryModel from "../../models/SubCategoryModel";
import createToken, { TExpiresIn } from "../../utils/createToken";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import config from "../../config";

const UpdateCandidateProfileService = async (
  loginUserId: string,
  req: any,
  payload: Partial<IUpdateCandidatePayload>
) => {
  const { subCategoryId, longitude, latitude } = payload;

  //check sub category
  if (subCategoryId) {
    const subCategory = await SubCategoryModel.findById(subCategoryId);
    if (!subCategory) {
      throw new CustomError(404, "Sorry, subCategoryId not found");
    }
    //set categoryId
    payload.categoryId = subCategory.categoryId;
  }

  //check longitude & latitude
  if (longitude && latitude) {
    payload.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };
  }

  //if image is available
  if (req.file) {
    payload.profileImg = await uploadToCloudinary(
      req?.file?.path as string,
      "candidate"
    );
  }

  //update the candidate
  const result = await CandidateModel.findOneAndUpdate(
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
      role: "candidate",
    },
    config.jwt_access_secret as Secret,
    config.jwt_access_expires_in as TExpiresIn
  );

  return {
    accessToken,
  };
};

export default UpdateCandidateProfileService;
