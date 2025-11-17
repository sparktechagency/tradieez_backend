import CreateSubCategoryService from "../services/subCategory/CreateSubCategoryService";
import asyncHandler from "../utils/asyncHandler";

const createSubCategory = asyncHandler(async (req, res) => {
    const result = await CreateSubCategoryService(req.body);
    res.status(200).json({
        success: true,
        message: "Sub Category is created successfully",
        data: result
    })
})


const SubCategoryController = {
    createSubCategory
}