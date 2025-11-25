import { CategoryValidFields } from "../constant/category.constant";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";
import CreateBlogCategoryService from "../services/blogCategory/CreateBlogCategoryService";
import UpdateBlogCategoryService from "../services/blogCategory/UpdateBlogCategoryService";
import GetBlogCategoriesService from "../services/blogCategory/GetBlogCategoriesService";
import GetBlogCategoryDropDownService from "../services/blogCategory/GetBlogCategoryDropDownService";
import GetBlogCategoryOptionsService from "../services/blogCategory/GetBlogCategoryOptionsService";
import DeleteBlogCategoryService from "../services/blogCategory/DeleteBlogCategoryService";


const createBlogCategory = asyncHandler(async (req, res) => {
    const result = await CreateBlogCategoryService(req.body);
    res.status(200).json({
        success: true,
        message: "Blog-category is created successfully",
        data: result
    })
})

const getBlogCategories = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, CategoryValidFields);
    const result = await GetBlogCategoriesService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Blog-categories are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getBlogCategoryDropDown = asyncHandler(async (req, res) => {
    const result = await GetBlogCategoryDropDownService();
    res.status(200).json({
        success: true,
        message: 'Blog-category drop-down are retrieved successfully',
        data: result
    })
})

const getBlogCategoryOptions = asyncHandler(async (req, res) => {
    const result = await GetBlogCategoryOptionsService();
    res.status(200).json({
        success: true,
        message: 'Blog-category options retrieved successfully',
        data: result
    })
})

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await UpdateBlogCategoryService(categoryId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Blog-category is updated successfully",
        data: result
    })
})

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await DeleteBlogCategoryService(categoryId as string);
    res.status(200).json({
        success: true,
        message: "Blog-category is deleted successfully",
        data: result
    })
})


const BlogCategoryController = {
    createBlogCategory,
    getBlogCategories,
    getBlogCategoryDropDown,
    getBlogCategoryOptions,
    updateBlogCategory,
    deleteBlogCategory
}

export default BlogCategoryController