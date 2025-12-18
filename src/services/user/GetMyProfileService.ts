import { Types } from "mongoose";
import { TUserRole } from "../../interfaces/user.interface";
import CandidateModel from "../../models/CandidateModel";
import EmployerModel from "../../models/EmployerModel";
import UserModel from "../../models/UserModel";
import AdminModel from "../../models/AdminModel";
import CustomError from "../../errors/CustomError";


const GetMyProfileService = async (userId: string, role: TUserRole) => {

    //if role is candidate
    if(role==="candidate"){
        const result = await CandidateModel.aggregate([
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
                    categoryId: "$categoryId",
                    category: "$category.name",
                    subCategoryId: "$subcategory._id",
                    subCategory: "$subcategory.name",
                    address: "$address",
                    coordinates: "$location.coordinates",
                    ratings: "$ratings",
                    totalReview: "$totalReviews",
                    isPrivate: "$isPrivate"
                }
            },
        ]);

        return result[0];
    }


    //if role is employer
    if(role==="employer"){
        const result = await EmployerModel.aggregate([
            {
                $match: {
                    userId: new Types.ObjectId(userId)
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
                    ratings: "$ratings",
                    totalReview: "$totalReviews",
                }
            },
        ]);

        return result[0];
    }

    if(role === "admin"){
        const result = await AdminModel.findOne({ userId}).select("-_id");
        if(!result){
            throw new CustomError(404, "Profile Not Found");
        }

        return result
    }

    //role is superadmin
    const result = await UserModel.findOne({ _id: userId, role: "superAdmin" });
    return {
        fullName: "Super Admin",
        email: result?.email,
        profileImg: ""
    }
    
}

export default GetMyProfileService;