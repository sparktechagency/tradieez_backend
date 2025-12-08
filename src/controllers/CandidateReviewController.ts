import asyncHandler from "../utils/asyncHandler";
import PostCandidateReviewService from "../services/candidateReview/PostCandidateReviewService";
import pickValidFields from "../utils/pickValidFields";
import { CANDIDATE_REVIEW_VALID_FIELDS } from "../constant/candidateReview.constant";
import GetMyReviewsService from "../services/candidateReview/GetMyReviewsService";


const postReview = asyncHandler(async (req, res) => {
    const { userId: candidateUserId } = req.headers;
    const result = await PostCandidateReviewService(candidateUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Review is posted successfully",
        data: result
    })
})

const getMyReviews = asyncHandler(async (req, res) => {
    const { userId: employerUserId } = req.headers;
    const validatedQuery = pickValidFields(req.query, CANDIDATE_REVIEW_VALID_FIELDS);
    const result = await GetMyReviewsService(employerUserId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: "Reviews are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

const getCandidateReviews = asyncHandler(async (req, res) => {
    const candidateUserId = req.params.userId;
    const validatedQuery = pickValidFields(req.query, CANDIDATE_REVIEW_VALID_FIELDS);
    const result = await GetMyReviewsService(candidateUserId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: "Reviews are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})


const CandidateReviewController = {
    postReview,
    getMyReviews,
    getCandidateReviews
}

export default CandidateReviewController;