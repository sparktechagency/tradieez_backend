import CustomError from "../../errors/CustomError";
import UserModel from "../../models/UserModel";
import isNotObjectId from "../../utils/isNotObjectId";

const ChangeStatusService = async (userId: string, status: 'active' | 'blocked') => {
    if (isNotObjectId(userId)) {
        throw new CustomError(400, "userId must be a valid ObjectId")
    }

    const user = await UserModel.findById(userId);
    if (!user) {
        throw new CustomError(404, "userId not found");
    }

    //check user is not verified
    if (!user.isVerified) {
        throw new CustomError(403, "This user account is not verified");
    }

    await UserModel.updateOne(
        { _id: userId },
        { status }
    );

    return {
        message: `User has been ${status === "active" ? "activated" : "blocked"} successfully.`
    };
}

export default ChangeStatusService;
