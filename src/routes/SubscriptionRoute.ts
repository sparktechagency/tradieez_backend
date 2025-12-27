import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import SubscriptionController from '../controllers/SubscriptionController';
import validationMiddleware from '../middlewares/validationMiddleware';
import { createSubscriptionSchema } from '../validation/subscription.validation';
const router = express.Router();

router.post(
  "/create-subscription",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  validationMiddleware(createSubscriptionSchema),
  SubscriptionController.createSubscription
);

const SubscriptionRoute = router;
export default SubscriptionRoute;