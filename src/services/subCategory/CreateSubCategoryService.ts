/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { ISubCategory } from "../../interfaces/subCategory.interface";
import CategoryModel from "../../models/CategoryModel";
import convertToSlug from "../../utils/convertToSlug";


const CreateSubCategoryService = async (payload: ISubCategory) => {
    const { name, categoryId } = payload;
    const slug = convertToSlug(name);

    return payload;

    //check category
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
        throw new CustomError(404, 'This categoryId not found');
    }

    //check category is already existed
    const subCategory = await CategoryModel.findOne({
        slug
    });
    

    if (category) {
        throw new CustomError(409, 'This category already exists.');
    }



    const result = await CategoryModel.create({
        name,
        slug
    })
    return result;
}

export default CreateSubCategoryService;
