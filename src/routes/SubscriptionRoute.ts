import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import SubscriptionController from '../controllers/SubscriptionController';
import validationMiddleware from '../middlewares/validationMiddleware';
import { createSubscriptionSchema, updateSubscriptionSchema } from '../validation/subscription.validation';
const router = express.Router();

router.post(
  "/create-subscription",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  validationMiddleware(createSubscriptionSchema),
  SubscriptionController.createSubscription
);
router.get(
  "/get-subscriptions",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  SubscriptionController.getSubscriptions
);
router.get(
  "/get-user-subscriptions",
  AuthMiddleware(UserRole.employer),
  SubscriptionController.getUserSubscriptions
);
router.patch(
  "/update-subscription/:subscriptionId",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  validationMiddleware(updateSubscriptionSchema),
  SubscriptionController.updateSubscription
);
router.delete(
  "/delete-subscription/:subscriptionId",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  SubscriptionController.deleteSubscription
);
const SubscriptionRoute = router;
export default SubscriptionRoute;