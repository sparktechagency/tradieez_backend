import CustomError from "../../errors/CustomError";
import SubCategoryModel from "../../models/SubCategoryModel";
import isNotObjectId from "../../utils/isNotObjectId";

const DeleteSubCategoryService = async (subCategoryId: string) => {
    if (isNotObjectId(subCategoryId)) {
        throw new CustomError(400, "categoryId must be a valid ObjectId")
    }
    const category = await SubCategoryModel.findById(subCategoryId)
    if(!category){
        throw new CustomError(404, 'Sorry, subCategoryId not found');
    }

    const result = await SubCategoryModel.deleteOne({ _id: subCategoryId})
    return result;
}

export default DeleteSubCategoryService;