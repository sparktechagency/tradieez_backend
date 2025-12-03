import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import EmployerReviewController from '../controllers/EmployerReviewController';
import { UserRole } from '../constant/user.constant';

const router = express.Router();

router.post(
    '/post-review',
    AuthMiddleware(UserRole.employer),
    //validationMiddleware(createReviewValidationSchema),
    EmployerReviewController.postReview
);
// router.delete(
//     '/delete-review/:reviewId',
//      AuthMiddleware(UserRole.admin, UserRole.super_admin), 
//     ReviewController.deleteRevie
// )
// router.get('/get-user-product-reviews/:productId', ReviewController.getUserProductReviews);
// router.get('/get-testimonials', ReviewController.getTestimonials);


const ReviewRoutes = router;
export default ReviewRoutes;