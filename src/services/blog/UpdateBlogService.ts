/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { IBlog } from "../../interfaces/blog.interface";
import BlogCategoryModel from "../../models/BlogCategoryModel";
import BlogModel from "../../models/BlogModel";
import isNotObjectId from "../../utils/isNotObjectId";
import uploadToCloudinary from "../../utils/uploadToCloudinary";

const UpdateBlogService = async (req:any, blogId: string, payload: Partial<IBlog>) => {
    if (isNotObjectId(blogId)) {
        throw new CustomError(400, "blogId must be a valid ObjectId")
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
        throw new CustomError(404, 'blogId not found');
    }

    //check categoryId
    if (payload.categoryId) {
        const category = await BlogCategoryModel.findById(payload.categoryId);
        if (!category) {
            throw new CustomError(409, 'categoryId not found');
        }
    }

    //if image is available
    if (req.file) {
        payload.image = await uploadToCloudinary(req?.file?.path as string);
    }

    const result = await BlogModel.updateOne(
        { _id: blogId },
        payload,
        { runValidators: true}
    )

    return result;
}

export default UpdateBlogService;