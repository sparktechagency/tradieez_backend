import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import UserController from "../controllers/UserController";
import validationMiddleware from "../middlewares/validationMiddleware";
import { updateCandidateSchema } from "../validation/candidate.validation";
import upload from "../helper/upload";

const router = express.Router();

router.get(
  '/get-employers',
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  UserController.getEmployers
);
router.get(
  '/get-candidates',
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  UserController.getCandidates
);
router.get(
  '/get-find-candidates',
  AuthMiddleware(UserRole.employer),
  UserController.getFindCandidates
);
router.get(
  '/get-single-candidate/:userId',
  AuthMiddleware("employer"),
  UserController.getSingleCandidate
);
router.get(
  '/get-candidate/:userId',
  AuthMiddleware("admin", "superAdmin"),
  UserController.getCandidate
);
router.get(
  '/get-single-employer/:userId',
  AuthMiddleware("candidate"),
  UserController.getSingleEmployer
);
router.get(
  '/get-employer/:userId',
  AuthMiddleware("admin", "superAdmin"),
  UserController.getEmployer
);
router.get(
  '/get-my-profile',
  AuthMiddleware("admin", "superAdmin", "candidate", "employer"),
  UserController.getMyProfile
);
router.patch(
  '/update-candidate-profile',
  AuthMiddleware("candidate"),
  upload.single("image"),
  validationMiddleware(updateCandidateSchema),
  UserController.updateCandidateProfile
);


const UserRoute = router;
export default UserRoute;
