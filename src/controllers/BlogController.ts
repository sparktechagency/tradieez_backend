import { CategoryValidFields } from "../constant/category.constant";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";
import UpdateBlogCategoryService from "../services/blogCategory/UpdateBlogCategoryService";
import GetBlogCategoryDropDownService from "../services/blogCategory/GetBlogCategoryDropDownService";
import DeleteBlogCategoryService from "../services/blogCategory/DeleteBlogCategoryService";
import CreateBlogService from "../services/blog/CreateBlogService";
import GetBlogsService from "../services/blog/GetBlogsService";
import { BlogValidFields } from "../constant/blog.constant";
import GetUserBlogsService from "../services/blog/GetUserBlogsService";


const createBlog = asyncHandler(async (req, res) => {
    const result = await CreateBlogService(req, req.body);
    res.status(200).json({
        success: true,
        message: "Blog is published successfully",
        data: result
    })
})

const getUserBlogs = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, BlogValidFields);
    const result = await GetUserBlogsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Blogs are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getBlogs = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, BlogValidFields);
    const result = await GetBlogsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Blogs are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getSingleBlog = asyncHandler(async (req, res) => {
    const result = await GetBlogCategoryDropDownService();
    res.status(200).json({
        success: true,
        message: 'Blog-category drop-down are retrieved successfully',
        data: result
    })
})


const updateBlog = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await UpdateBlogCategoryService(categoryId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Blog-category is updated successfully",
        data: result
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const result = await DeleteBlogCategoryService(categoryId as string);
    res.status(200).json({
        success: true,
        message: "Blog-category is deleted successfully",
        data: result
    })
})


const BlogController = {
    createBlog,
    getUserBlogs,
    getBlogs,
    getSingleBlog,
    updateBlog,
    deleteBlog,
}

export default BlogController