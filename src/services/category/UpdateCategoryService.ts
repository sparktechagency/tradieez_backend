/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { ICategory } from "../../interfaces/category.interface";
import CategoryModel from "../../models/CategoryModel";
import convertToSlug from "../../utils/convertToSlug";
import isNotObjectId from "../../utils/isNotObjectId";
import uploadToCloudinary from "../../utils/uploadToCloudinary";

const UpdateCategoryService = async (req:any, categoryId: string, payload: Partial<ICategory>) => {
    if (isNotObjectId(categoryId)) {
        throw new CustomError(400, "categoryId must be a valid ObjectId")
    }

    const existingCategory = await CategoryModel.findById(categoryId);
    if (!existingCategory) {
        throw new CustomError(404, 'This categoryId not found');
    }

    if (payload.name) {
        const slug = convertToSlug(payload.name);
        payload.slug = slug;
        const categoryExist = await CategoryModel.findOne({
            _id: { $ne: categoryId },
            slug
        });
        if (categoryExist) {
            throw new CustomError(409, 'Sorry, This category already exists.');
        }
    }

    //if image is available
    if (req.file) {
        payload.image = await uploadToCloudinary(req?.file?.path as string);
    }

    const result = await CategoryModel.updateOne(
        { _id: categoryId },
        payload,
        { runValidators: true}
    )

    return result;
}

export default UpdateCategoryService;