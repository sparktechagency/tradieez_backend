/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { ICategory } from "../../interfaces/category.interface";
import CategoryModel from "../../models/CategoryModel";
import convertToSlug from "../../utils/convertToSlug";
import uploadToCloudinary from "../../utils/uploadToCloudinary";


const CreateCategoryService = async ( req: any, payload: ICategory) => {
    const { name } = payload;
    
    const slug = convertToSlug(name);

    if (!req.file) {
        throw new CustomError(400, "Upload an image");
    }

  
    //check category is already existed
    const category = await CategoryModel.findOne({
        slug
    });

    if (category) {
        throw new CustomError(409, 'This category already exists.');
    }

    //upload image
    const image = await uploadToCloudinary(req?.file?.path as string);


    const result = await CategoryModel.create({
        name,
        slug,
        image
    })
    return result;
}

export default CreateCategoryService;
