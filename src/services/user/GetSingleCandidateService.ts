import { Types } from "mongoose";
import CandidateModel from "../../models/CandidateModel";
import CustomError from "../../errors/CustomError";
import isNotObjectId from "../../utils/isNotObjectId";

const GetSingleCandidateService = async (candidateUserId: string) => {
    if (isNotObjectId(candidateUserId)) {
        throw new CustomError(400, "userId must be a valid ObjectId")
    }

    const result = await CandidateModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(candidateUserId),
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
                title: 1,
                jobSeekingTitle:1,
                workRate: 1,
                workType: 1,
                employmentType: 1,
                skills: 1,
                experience: 1,
                dateOfBirth:1,
                category: "$category.name",
                subCategory: "$subcategory.name",
                address: "$address",
                coordinates: "$location.coordinates",
                postalCode: "$postalCode",
                city: "$city",
                ratings: "$ratings",
                totalReview: "$totalReviews",
                description: "$description"
            }
        },
    ])

    if (result.length === 0) {
        throw new CustomError(404, "Candidate not found or profile is private/locked");
    }

    return result[0];
}

export default GetSingleCandidateService;