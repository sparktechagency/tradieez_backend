import express from "express";
import DashboardController from "../controllers/DashboardController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";

const router = express.Router();

router.get(
  "/get-employer-stats",
  AuthMiddleware(UserRole.employer),
  DashboardController.getEmployerStats,
);
router.get(
  "/get-candidate-stats",
  AuthMiddleware(UserRole.candidate),
  DashboardController.getCandidateStats,
);
router.get(
  "/get-user-overview/:year",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  DashboardController.getUserOverview,
);
router.get(
  "/get-income-overview/:year",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  DashboardController.getIncomeOverview,
);
router.get(
  "/get-stats",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  DashboardController.getStats,
);

const DashboardRoute = router;
export default DashboardRoute;
