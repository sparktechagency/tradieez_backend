import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import validationMiddleware from '../middlewares/validationMiddleware';
import { createSubscriptionSchema } from '../validation/subscription.validation';
import SubscriptionController from '../controllers/SubscriptionController';

const router = express.Router();

router.post(
  "/create-subscription",
  AuthMiddleware(UserRole.employer),
  validationMiddleware(createSubscriptionSchema),
  SubscriptionController.createSubscription
);
router.get(
  '/get-my-subscriptions',
  AuthMiddleware(UserRole.employer),
  SubscriptionController.getMySubscriptions,
);


const SubscriptionRoute = router;
export default SubscriptionRoute;