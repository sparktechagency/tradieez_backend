import CustomError from "../../errors/CustomError";
import CategoryModel from "../../models/CategoryModel";
import isNotObjectId from "../../utils/isNotObjectId";

const UpdateCategoryService = async (categoryId: string, name: string) => {
    if (isNotObjectId(categoryId)) {
        throw new CustomError(400, "categoryId must be a valid ObjectId")
    }

    const existingCategory = await CategoryModel.findById(categoryId);
    if (!existingCategory) {
        throw new CustomError(404, 'This categoryId not found');
    }

    const slug = slugify(name).toLowerCase();
    const categoryExist = await CategoryModel.findOne({
        _id: { $ne: categoryId },
        slug
    })
    if (categoryExist) {
        throw new CustomError(409, 'Sorry! This category is already existed');
    }

    const result = await CategoryModel.updateOne(
        { _id: categoryId },
        {
            name,
            slug
        }
    )

    return result;
}

export default UpdateCategoryService;