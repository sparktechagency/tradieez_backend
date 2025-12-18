/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import CustomError from "../../errors/CustomError";
import AdminModel from "../../models/AdminModel";
import isNotObjectId from "../../utils/isNotObjectId";
import UserModel from "../../models/UserModel";

const DeleteAdminService = async (userId: string) => {
    if (isNotObjectId(userId)) {
        throw new CustomError(400, "adminId must be a valid ObjectId")
    }

    //check admin
    const admin = await AdminModel.findOne({ userId });
    if (!admin) {
        throw new CustomError(404, "Admin Not Found with the provided ID");
    }

    //transaction & rollback
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //delete admin user
        await UserModel.deleteOne({ _id: userId }, { session });

        //delete admin
        const result = await AdminModel.deleteOne({ userId }, { session });

        //transaction success
        await session.commitTransaction();
        await session.endSession();
        return result;
    }
    catch (err:any) {
         await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}

export default DeleteAdminService;