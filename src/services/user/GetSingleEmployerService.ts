import { Types } from "mongoose";
import EmployerModel from "../../models/EmployerModel";

const GetSingleEmployerService = async (userId: string) => {

    const result = await EmployerModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(userId)
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
            $lookup: {
                from: "reviews",
                let: { uid: "$userId" },   //$$uid // <-- variable created here
                pipeline: [
                    { $match: { $expr: { $eq: ["$userId", "$$uid"] } } },
                    { $count: "count" },
                ],
                as: "reviewCount"
            }
        },
        {
            $addFields: {
                totalReview: {
                    $ifNull: [{ $arrayElemAt: ["$reviewCount.count", 0] }, 0]
                }
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
                availableDate: 1,
                workRate:1,
                workType:1,
                employmentType:1,
                skills:1,
                experience:1,
                category: "$category.name",
                subCategory: "$subcategory.name",
                address:"$address",
                coordinates: "$location.coordinates",
                ratings: "$ratings",
                totalReview: "$totalReview",
                status: "$user.status",
                createdAt: "$createdAt"
            }
        },
    ])

    return result;
}

export default GetSingleEmployerService;