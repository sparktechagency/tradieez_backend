import CustomError from "../../errors/CustomError";
import { IBlogCategory } from "../../interfaces/blogCategory.interface";
import BlogCategoryModel from "../../models/BlogCategoryModel";
import convertToSlug from "../../utils/convertToSlug";
import isNotObjectId from "../../utils/isNotObjectId";

const UpdateBlogCategoryService = async (categoryId: string, payload: Partial<IBlogCategory>) => {
    if (isNotObjectId(categoryId)) {
        throw new CustomError(400, "categoryId must be a valid ObjectId")
    }

    const category = await BlogCategoryModel.findById(categoryId);
    if (!category) {
        throw new CustomError(404, 'This categoryId not found');
    }

    if (payload.name) {
        const slug = convertToSlug(payload.name);
        payload.slug = slug;
        const categoryExist = await BlogCategoryModel.findOne({
            _id: { $ne: categoryId },
            slug
        });
        if (categoryExist) {
            throw new CustomError(409, 'Sorry, This category already exists.');
        }
    }

    const result = await BlogCategoryModel.updateOne(
        { _id: categoryId },
        payload,
        { runValidators: true}
    )

    return result;
}

export default UpdateBlogCategoryService;