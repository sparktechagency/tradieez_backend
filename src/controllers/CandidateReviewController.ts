import asyncHandler from "../utils/asyncHandler";
import PostCandidateReviewService from "../services/candidateReview/PostCandidateReviewService";


const postReview = asyncHandler(async (req, res) => {
    const { userId: candidateUserId } = req.headers;
    const result = await PostCandidateReviewService(candidateUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Review is posted successfully",
        data: result
    })
})


const CandidateReviewController = {
    postReview
}

export default CandidateReviewController;