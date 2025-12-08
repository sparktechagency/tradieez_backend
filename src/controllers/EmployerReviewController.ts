import asyncHandler from "../utils/asyncHandler";
import PostEmployerReviewService from "../services/employerReview/PostEmployerReviewService";
import GetMyReviewsService from "../services/employerReview/GetMyReviewsService";


const postReview = asyncHandler(async (req, res) => {
    const { userId: employerUserId } = req.headers;
    const result = await PostEmployerReviewService(employerUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Review is posted successfully",
        data: result
    })
})

const getMyReviews = asyncHandler(async (req, res) => {
    const { userId: candidateUserId } = req.headers;
    const result = await GetMyReviewsService(candidateUserId as string);
    res.status(200).json({
        success: true,
        message: "Reviews are retrieved successfully",
        data: result
    })
})


const EmployerReviewController = {
    postReview,
    getMyReviews
}

export default EmployerReviewController;