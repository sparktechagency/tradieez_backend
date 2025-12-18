/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAdmin } from "../../interfaces/admin.interface";
import AdminModel from "../../models/AdminModel";
import uploadToCloudinary from "../../utils/uploadToCloudinary";


const UpdateAdminProfileService = async (req: any, adminUserId: string, payload: Partial<IAdmin>) => {
    //if image is available
    if (req.file) {
        payload.profileImg = await uploadToCloudinary(req?.file?.path as string, "admin");
    }

    //update admin
    const result = await AdminModel.updateOne(
        { userId: adminUserId },
        payload
    )

    return result;
}

export default UpdateAdminProfileService