import { Types } from "mongoose";
import CandidateModel from "../../models/CandidateModel";
import CustomError from "../../errors/CustomError";

const GetCandidateService = async (userId: string) => {

    const result = await CandidateModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(userId),
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
                title:1,
                jobSeekingTitle:1,
                workRate:1,
                workType:1,
                employmentType:1,
                skills:1,
                experience:1,
                isPrivate:1,
                category: "$category.name",
                subCategory: "$subcategory.name",
                address:"$address",
                coordinates: "$location.coordinates",
                ratings: "$ratings",
                totalReviews: "$totalReviews",
            }
        },
    ])

    if(result.length===0){
        throw new CustomError(404, "candidateId not found");
    }

    return result[0];
}

export default GetCandidateService;