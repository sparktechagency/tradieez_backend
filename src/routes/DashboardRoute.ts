import express from "express";
import DashboardController from "../controllers/DashboardController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";

const router = express.Router();



router.get(
  '/get-employer-stats',
  AuthMiddleware(UserRole.employer),
  DashboardController.getEmployerStats
);
router.get(
  '/get-candidate-stats',
  AuthMiddleware(UserRole.candidate),
  DashboardController.getCandidateStats
);

const DashboardRoute = router;
export default DashboardRoute;
