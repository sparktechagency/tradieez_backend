import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";
import CreateBlogService from "../services/blog/CreateBlogService";
import GetBlogsService from "../services/blog/GetBlogsService";
import { BlogValidFields } from "../constant/blog.constant";
import GetUserBlogsService from "../services/blog/GetUserBlogsService";
import UpdateBlogService from "../services/blog/UpdateBlogService";
import DeleteBlogService from "../services/blog/DeleteBlogService";
import GetSingleBlogService from "../services/blog/GetSingleBlogService";
import GetBlogService from "../services/blog/GetBlogService";


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
     const { blogId } = req.params;
    const result = await GetSingleBlogService(blogId as string);
    res.status(200).json({
        success: true,
        message: 'Blog is retrieved successfully',
        data: result
    })
})
const getBlog = asyncHandler(async (req, res) => {
     const { blogId } = req.params;
    const result = await GetBlogService(blogId as string);
    res.status(200).json({
        success: true,
        message: 'Blog is retrieved successfully',
        data: result
    })
})


const updateBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const result = await UpdateBlogService(req, blogId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Blog is updated successfully",
        data: result
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const result = await DeleteBlogService(blogId as string);
    res.status(200).json({
        success: true,
        message: "Blog is deleted successfully",
        data: result
    })
})


const BlogController = {
    createBlog,
    getUserBlogs,
    getBlogs,
    getSingleBlog,
    getBlog,
    updateBlog,
    deleteBlog,
}

export default BlogController