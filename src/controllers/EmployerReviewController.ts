import asyncHandler from "../utils/asyncHandler";
import PostEmployerReviewService from "../services/employerReview/PostEmployerReviewService";


const postReview = asyncHandler(async (req, res) => {
    const { userId: employerUserId } = req.headers;
    const result = await PostEmployerReviewService(employerUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Review is posted successfully",
        data: result
    })
})


const EmployerReviewController = {
    postReview,
}

export default EmployerReviewController;