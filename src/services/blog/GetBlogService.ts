import { Types } from "mongoose"
import BlogModel from "../../models/BlogModel"
import isNotObjectId from "../../utils/isNotObjectId"
import CustomError from "../../errors/CustomError"


const GetBlogService = async (blogId: string) => {
     if (isNotObjectId(blogId)) {
        throw new CustomError(400, "blogId must be a valid ObjectId")
    }

   const result = await BlogModel.aggregate([
    {
        $match: {
            _id: new Types.ObjectId(blogId)
        }
    },
        {
            $lookup: {
                from: "blogcategories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $project: {
                _id: 1,
                title: 1,
                categoryId:"$categoryId",
                category: "$category.name",
                image: "$image",
                view: "$view",
                statu: "$status",
                description: "$description",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
            },
        },
    ])


    if (result.length === 0) {
        throw new CustomError(404, 'blogId not found');
    }

    return result[0];
}

export default GetBlogService