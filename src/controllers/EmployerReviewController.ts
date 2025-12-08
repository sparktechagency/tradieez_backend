import asyncHandler from "../utils/asyncHandler";
import PostEmployerReviewService from "../services/employerReview/PostEmployerReviewService";
import GetMyReviewsService from "../services/employerReview/GetMyReviewsService";
import pickValidFields from "../utils/pickValidFields";
import { EMPLOYER_REVIEW_VALID_FIELDS } from "../constant/employerReview.constant";
import GetCandidateReviewsService from "../services/employerReview/GetCandidateReviewsService";


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
    const validatedQuery = pickValidFields(req.query, EMPLOYER_REVIEW_VALID_FIELDS);
    const result = await GetMyReviewsService(candidateUserId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: "Reviews are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

const getCandidateReviews = asyncHandler(async (req, res) => {
    const candidateUserId = req.params.userId;
    const validatedQuery = pickValidFields(req.query, EMPLOYER_REVIEW_VALID_FIELDS);
    const result = await GetCandidateReviewsService(candidateUserId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: "Reviews are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})


const EmployerReviewController = {
    postReview,
    getMyReviews,
    getCandidateReviews
}

export default EmployerReviewController;