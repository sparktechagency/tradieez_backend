/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import config from "../../config";
import CustomError from "../../errors/CustomError";
import { IAdminPayload } from "../../interfaces/admin.interface";
import UserModel from "../../models/UserModel";
import AdminModel from "../../models/AdminModel";


const CreateAdminService = async (payload: IAdminPayload) => {
    const { email, password } = payload;
    const existingUser = await UserModel.findOne({ email });

    //User already exists
    if (existingUser && existingUser.isVerified) {
        throw new CustomError(409, "Admin already exists for the provided email address.");
    }

    if (!password) {
        payload.password = config.admin_default_password as string;
    }

    //transaction & rollback
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        //create admin user
        const user = await UserModel.create([{
            ...payload,
            role: "admin",
            isVerified: true,
            status: 'active',
            regOtp: config.super_admin_reg_otp
        }], { session })

        //create admin
        const result = await AdminModel.create([
            {
                ...payload,
                userId: user[0]?._id
            }
        ], { session });

        //transaction success
        await session.commitTransaction();
        await session.endSession();
        return result[0];

    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}

export default CreateAdminService;