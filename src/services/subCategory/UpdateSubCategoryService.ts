import CustomError from "../../errors/CustomError";
import { ISubCategory } from "../../interfaces/subCategory.interface";
import CategoryModel from "../../models/CategoryModel";
import SubCategoryModel from "../../models/SubCategoryModel";
import convertToSlug from "../../utils/convertToSlug";
import isNotObjectId from "../../utils/isNotObjectId";

const UpdateSubCategoryService = async (subCategoryId: string, payload: Partial<ISubCategory>) => {
    const { categoryId, name} = payload;
    if (isNotObjectId(subCategoryId)) {
        throw new CustomError(400, "subCategoryId must be a valid ObjectId")
    }

    //check sub category
    const subCategory = await SubCategoryModel.findById(subCategoryId);
    if (!subCategory) {
        throw new CustomError(404, 'This subCategoryId not found');
    }

    //check category
    if (categoryId) {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            throw new CustomError(404, 'Sorry, categoryId not found');
        }
    }

    //check name
    if (name) {
        const slug = convertToSlug(name);
        payload.slug = slug;

        const associatedCategoryId  = categoryId || subCategory.categoryId;

        const subCategoryExist = await SubCategoryModel.findOne({
            _id: { $ne: subCategoryId },
            categoryId: associatedCategoryId,
            slug
        });
        if (subCategoryExist) {
            throw new CustomError(409, 'This sub-category is already exists under the selected category.');
        }
    }

    const result = await SubCategoryModel.updateOne(
        { _id: subCategoryId },
        payload,
        { runValidators: true}
    )

    return result;
}

export default UpdateSubCategoryService;