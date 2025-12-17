import asyncHandler from "../utils/asyncHandler";



const createAdmin = asyncHandler(async (req, res) => {
    const result = await CreateBlogService(req, req.body);
    res.status(200).json({
        success: true,
        message: "Blog is published successfully",
        data: result
    })
})