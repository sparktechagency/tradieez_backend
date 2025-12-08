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

// router.delete(
//     '/delete-review/:reviewId',
//      AuthMiddleware(UserRole.admin, UserRole.super_admin), 
//     ReviewController.deleteRevie
// )



const EmployerReviewRoute = router;
export default EmployerReviewRoute;