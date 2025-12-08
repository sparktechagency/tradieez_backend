import { Types } from "mongoose";
import CandidateModel from "../../models/CandidateModel";
import CustomError from "../../errors/CustomError";

const GetSingleCandidateService = async (userId: string) => {

    const result = await CandidateModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(userId),
                isPrivate: false,
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $match: {
                "user.status": "active" //filter by status
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $lookup: {
                from: "subcategories",
                localField: "subCategoryId",
                foreignField: "_id",
                as: "subcategory"
            }
        },
        {
            $unwind: "$subcategory"
        },
        {
            $project: {
                _id: 0,
                userId: 1,
                fullName: 1,
                email: 1,
                phone: 1,
                profileImg: 1,
                availableDate: 1,
                workRate: 1,
                workType: 1,
                employmentType: 1,
                skills: 1,
                experience: 1,
                category: "$category.name",
                subCategory: "$subcategory.name",
                address: "$address",
                coordinates: "$location.coordinates",
                ratings: "$ratings",
                totalReview: "$totalReviews",
            }
        },
    ])

    if (result.length === 0) {
        throw new CustomError(404, "Candidate not found or profile is private/locked");
    }

    return result[0];
}

export default GetSingleCandidateService;