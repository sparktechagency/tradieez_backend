import { Types } from "mongoose";
import EmployerModel from "../../models/EmployerModel";
import isNotObjectId from "../../utils/isNotObjectId";
import CustomError from "../../errors/CustomError";

const GetSingleEmployerService = async (employerUerId: string) => {
    if (isNotObjectId(employerUerId)) {
        throw new CustomError(400, "userId must be a valid ObjectId")
    }

    const result = await EmployerModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(employerUerId),
            }
        },
        {
            $project: {
                _id: 0,
                userId: 1,
                fullName: 1,
                email: 1,
                phone: 1,
                profileImg: 1,
                socialMedia:1,
                ratings: "$ratings",
                totalReviews: "$totalReviews",
            }
        },
    ])

    if (result.length === 0) {
        throw new CustomError(404, "Employer not found with the provided ID.");
    }

    return result[0];
}

export default GetSingleEmployerService;