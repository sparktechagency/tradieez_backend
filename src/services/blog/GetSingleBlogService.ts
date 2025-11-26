import { Types } from "mongoose"
import BlogModel from "../../models/BlogModel"
import isNotObjectId from "../../utils/isNotObjectId"
import CustomError from "../../errors/CustomError"


const GetSingleBlogService = async (blogId: string) => {
    if (isNotObjectId(blogId)) {
        throw new CustomError(400, "blogId must be a valid ObjectId")
    }

    //increment the blog view
    await BlogModel.updateOne(
        { _id: blogId },
        { $inc: { view: 1 } },
        { runValidators: true }
    )


    const result = await BlogModel.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(blogId),
                status: "visible"
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
                category: "$category.name",
                image: "$image",
                view: "$view",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
            },
        },
    ])


    if (result.length === 0) {
        throw new CustomError(404, 'blogId not found or blog is hidden');
    }


    return result[0];
}

export default GetSingleBlogService