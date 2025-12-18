import CustomError from "../../errors/CustomError";
import { IAdmin } from "../../interfaces/admin.interface";
import AdminModel from "../../models/AdminModel";
import isNotObjectId from "../../utils/isNotObjectId";

const UpdateAdminService = async (userId: string, payload: Partial<IAdmin>) => {
    if (isNotObjectId(userId)) {
        throw new CustomError(400, "adminId must be a valid ObjectId")
    }

    //check admin
    const admin = await AdminModel.findOne({ userId });
    if (!admin) {
        throw new CustomError(404, "Admin Not Found with the provided ID");
    }
    const result = AdminModel.updateOne(
        { userId },
        payload
    )

    return result;
}

export default UpdateAdminService;