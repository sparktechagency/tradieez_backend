import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import validationMiddleware from '../middlewares/validationMiddleware';
import PlanController from '../controllers/PlanController';
import { createPlanSchema, updatePlanSchema } from '../validation/plan.validation';
const router = express.Router();

router.post(
  "/create-plan",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  validationMiddleware(createPlanSchema),
  PlanController.createPlan
);
router.get(
  "/get-plans",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  PlanController.getPlans
);
router.get(
  "/get-user-plans",
  AuthMiddleware(UserRole.employer),
  PlanController.getUserPlans
);
router.patch(
  "/update-plan/:planId",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  validationMiddleware(updatePlanSchema),
  PlanController.updatePlan
);
router.delete(
  "/delete-plan/:planId",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  PlanController.deletePlan
);
const PlanRoute = router;
export default PlanRoute;