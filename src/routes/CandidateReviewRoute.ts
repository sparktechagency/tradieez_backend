import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import validationMiddleware from '../middlewares/validationMiddleware';
import { candidateReviewSchema } from '../validation/review.validation';
import CandidateReviewController from '../controllers/CandidateReviewController';

const router = express.Router();

router.post(
    '/post-review',
    AuthMiddleware(UserRole.candidate),
    validationMiddleware(candidateReviewSchema),
    CandidateReviewController.postReview
);
// router.delete(
//     '/delete-review/:reviewId',
//      AuthMiddleware(UserRole.admin, UserRole.super_admin), 
//     ReviewController.deleteRevie
// )



const CandidateReviewRoute = router;
export default CandidateReviewRoute;