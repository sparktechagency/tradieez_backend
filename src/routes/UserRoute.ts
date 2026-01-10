import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import UserController from "../controllers/UserController";
import validationMiddleware from "../middlewares/validationMiddleware";
import { updateCandidateSchema } from "../validation/candidate.validation";
import upload from "../helper/upload";
import { updateEmployerSchema } from "../validation/employer.validation";
import { uploadCV } from "../helper/uploadCV";
import CustomError from "../errors/CustomError";
import CandidateModel from "../models/CandidateModel";

const router = express.Router();

router.get(
  "/get-employers",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  UserController.getEmployers
);
router.get(
  "/get-candidates",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  UserController.getCandidates
);
router.get(
  "/get-find-candidates",
  AuthMiddleware(UserRole.employer),
  UserController.getFindCandidates
);
router.get(
  "/get-single-candidate/:userId",
  AuthMiddleware("employer"),
  UserController.getSingleCandidate
);
router.get(
  "/get-candidate/:userId",
  AuthMiddleware("admin", "superAdmin"),
  UserController.getCandidate
);
router.get(
  "/get-single-employer/:userId",
  AuthMiddleware("candidate"),
  UserController.getSingleEmployer
);
router.get(
  "/get-employer/:userId",
  AuthMiddleware("admin", "superAdmin"),
  UserController.getEmployer
);
router.get(
  "/get-my-profile",
  AuthMiddleware("admin", "superAdmin", "candidate", "employer"),
  UserController.getMyProfile
);
router.patch(
  "/update-candidate-profile",
  AuthMiddleware("candidate"),
  upload.single("image"),
  validationMiddleware(updateCandidateSchema),
  UserController.updateCandidateProfile
);
router.patch(
  "/update-employer-profile",
  AuthMiddleware("employer"),
  upload.single("image"),
  validationMiddleware(updateEmployerSchema),
  UserController.updateEmployerProfile
);
router.patch(
  "/send-request/:userId",
  AuthMiddleware("employer"),
  UserController.sendRequest
);

router.post(
  "/upload-cv",
  AuthMiddleware("candidate"),
  uploadCV.single("cv"),
  async (req, res) => {
    const candidateUserId = req.headers.userId;
    if (!req.file) {
      throw new CustomError(400, "PDF file is required");
    }

    const result = await CandidateModel.updateOne(
      { userId: candidateUserId },
      { cv: req.file?.path } //
    );

    res.status(200).json({
      success: true,
      message: "CV is uploaded successfully",
      data: result,
    });
  }
);

const UserRoute = router;
export default UserRoute;
