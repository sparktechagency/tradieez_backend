import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import EmployerReviewController from '../controllers/EmployerReviewController';
import { UserRole } from '../constant/user.constant';
import validationMiddleware from '../middlewares/validationMiddleware';
import { employerReviewSchema } from '../validation/review.validation';

const router = express.Router();

router.post(
    '/post-review',
    AuthMiddleware(UserRole.employer),
    validationMiddleware(employerReviewSchema),
    EmployerReviewController.postReview
);

router.get(
    '/get-my-reviews',
    AuthMiddleware(UserRole.candidate),
    EmployerReviewController.getMyReviews
);


const EmployerReviewRoute = router;
export default EmployerReviewRoute;