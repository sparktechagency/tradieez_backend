import CustomError from "../../errors/CustomError";
import { IBlogCategory } from "../../interfaces/blogCategory.interface";
import BlogCategoryModel from "../../models/BlogCategoryModel";
import convertToSlug from "../../utils/convertToSlug";


const CreateBlogCategoryService = async ( payload: IBlogCategory) => {
    const { name } = payload;
    const slug = convertToSlug(name);

    //check category is already existed
    const category = await BlogCategoryModel.findOne({
        slug
    });

    if (category) {
        throw new CustomError(409, 'This category already exists.');
    }

    const result = await BlogCategoryModel.create({
        name,
        slug,
    })
    return result;
}

export default CreateBlogCategoryService;
