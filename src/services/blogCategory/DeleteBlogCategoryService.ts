import CustomError from "../../errors/CustomError";
import BlogCategoryModel from "../../models/BlogCategoryModel";
import isNotObjectId from "../../utils/isNotObjectId";

const DeleteBlogCategoryService = async (categoryId: string) => {
    if (isNotObjectId(categoryId)) {
        throw new CustomError(400, "categoryId must be a valid ObjectId")
    }
    const category = await BlogCategoryModel.findById(categoryId)
    if(!category){
        throw new CustomError(404, 'This categoryId not found');
    }

    //check if categoryId is associated with subCategory
    // const associatedWithSubCategory = await SubCategoryModel.findOne({
    //      categoryId
    // });
    // if(associatedWithSubCategory){
    //     throw new CustomError(409, 'Unable to delete, This category is associated with sub-category.');
    // }

    const result = await BlogCategoryModel.deleteOne({ _id: categoryId})
    return result;
}

export default DeleteBlogCategoryService;