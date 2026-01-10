/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import CustomError from "../../errors/CustomError";
import UserModel from "../../models/UserModel";
import sendVerificationEmail from "../../utils/email/sendVerificationEmail";
import { IRegisterCandidatePayload } from "../../interfaces/auth.interface";
import SubCategoryModel from "../../models/SubCategoryModel";
import CandidateModel from "../../models/CandidateModel";

const RegisterCandidateService = async (reqBody: IRegisterCandidatePayload) => {
  const {
    email,
    fullName,
    phone,
    title,
    jobSeekerTitle,
    subCategoryId,
    password,
    workRate,
    workType,
    availableDate,
    employmentType,
    longitude,
    latitude,
    address,
    city,
    postalCode,
    skills,
    experience,
  } = reqBody;

  //check email
  const existingUser = await UserModel.findOne({ email });

  //User already exists and verified
  if (existingUser && existingUser.isVerified) {
    throw new CustomError(409, "Email is already existed");
  }

  //User exists but not verified → resend verification
  if (existingUser && !existingUser.isVerified) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    //update existingUser
    await UserModel.updateOne(
      { email },
      { regOtp: otp, regOtpExpires: new Date(+new Date() + 600000) },
      { runValidators: true }
    );
    //send verification email
    await sendVerificationEmail(email, otp.toString());

    return {
      message: "Verification email resent. Please check your inbox.",
    };
  }

  //check sub category
  const subCategory = await SubCategoryModel.findById(subCategoryId);
  if (!subCategory) {
    throw new CustomError(404, "Sorry, subCategoryId not found");
  }

  //location coordinates
  const location = {
    type: "Point",
    coordinates: [longitude, latitude],
  };

  //transaction & rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const otp = Math.floor(100000 + Math.random() * 900000);
    //create new user
    const newUser = await UserModel.create(
      [
        {
          email,
          password,
          regOtp: otp,
          role: "candidate",
        },
      ],
      { session }
    );

    //create new employer
    await CandidateModel.create(
      [
        {
          userId: newUser[0]?._id,
          email,
          fullName,
          phone,
          title,
          jobSeekerTitle,
          categoryId: subCategory.categoryId,
          subCategoryId,
          workRate,
          workType,
          availableDate,
          employmentType,
          location,
          address,
          city,
          postalCode,
          skills,
          experience,
        },
      ],
      { session }
    );

    //send verification email
    await sendVerificationEmail(email, otp.toString());

    //transaction success
    await session.commitTransaction();
    await session.endSession();
    return {
      message: "Please check your email to verify",
    };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export default RegisterCandidateService;
