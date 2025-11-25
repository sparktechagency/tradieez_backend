import { CategoryValidFields } from "../constant/category.constant";
import CreateCategoryService from "../services/category/CreateCategoryService";
import DeleteCategoryService from "../services/category/DeleteCategoryService";
import GetCategoriesService from "../services/category/GetCategoriesService";
import GetCategoryDropDownService from "../services/category/GetCategoryDropDownService";
import UpdateCategoryService from "../services/category/UpdateCategoryService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";
import GetCategoryOptionsService from "../services/category/GetCategoryOptionsService";


const createCategory = asyncHandler(async (req, res) => {
    const result = await CreateCategoryService(req, req.body);
    res.status(200).json({
        success: true,
        message: "Category is created successfully",
        data: result
    })
})

const getCategories = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, CategoryValidFields);
    const result = await GetCategoriesService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Categories are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getCategoryDropDown = asyncHandler(async (req, res) => {
    const result = await GetCategoryDropDownService();
    res.status(200).json({
        success: true,
        message: 'Category drop-down are retrieved successfully',
        data: result
    })
})

const getCategoryOptions = asyncHandler(async (req, res) => {
    const result = await GetCategoryOptionsService();
    res.status(200).json({
        success: true,
        message: 'Category options retrieved successfully',
        data: result
    })
})

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await UpdateCategoryService(req, categoryId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Category is updated successfully",
        data: result
    })
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await DeleteCategoryService(categoryId as string);
    res.status(200).json({
        success: true,
        message: "Category is deleted successfully",
        data: result
    })
})


const CategoryController = {
    createCategory,
    getCategories,
    getCategoryDropDown,
    getCategoryOptions,
    updateCategory,
    deleteCategory
}

export default CategoryController