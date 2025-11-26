/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { IBlog } from "../../interfaces/blog.interface";
import BlogCategoryModel from "../../models/BlogCategoryModel";
import BlogModel from "../../models/BlogModel";
import uploadToCloudinary from "../../utils/uploadToCloudinary";


const CreateBlogService = async ( req: any, payload: IBlog) => {
    const { categoryId } = payload;
    
    if (!req.file) {
        throw new CustomError(400, "Upload an image");
    }
  
    //check category is already existed
    const category = await BlogCategoryModel.findById(categoryId);
    if (!category) {
        throw new CustomError(409, 'categoryId not found');
    }

    //upload image
    const image = await uploadToCloudinary(req?.file?.path as string);

    const result = await BlogModel.create({
        ...payload,
        image
    })
    return result;
}

export default CreateBlogService;
