import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { createJobValidationSchema, updateJobStatusSchema, updateJobValidationSchema } from "../validation/job.validation";
import JobController from "../controllers/JobController";
import { UserRole } from "../constant/user.constant";

const router = express.Router();


router.post(
  "/create-job",
  AuthMiddleware('employer'),
  validationMiddleware(createJobValidationSchema),
  JobController.createJob
);
router.get(
  "/get-my-jobs",
  AuthMiddleware('employer'),
  JobController.getMyJobs
);
router.get(
  "/get-candidate-jobs",
  JobController.getCandidateJobs
);
router.get(
  "/get-jobs",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  JobController.getJobs
);
router.patch(
  "/update-my-job/:jobId",
  AuthMiddleware('employer'),
  validationMiddleware(updateJobValidationSchema),
  JobController.updateMyJob
);
router.patch(
  "/update-job-status/:jobId",
  AuthMiddleware('admin', 'superAdmin'),
  validationMiddleware(updateJobStatusSchema),
  JobController.updateJobStatus
);
router.get(
  "/get-my-single-job/:jobId",
  AuthMiddleware('employer'),
  JobController.getMySingleJob
);
router.get(
  "/get-job/:jobId",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  JobController.getJob
);
router.get(
  "/get-single-job/:jobId",
  JobController.getSingleJob
);
router.delete(
  "/delete-my-job/:jobId",
  AuthMiddleware('employer'),
  JobController.deleteMyJob
);
router.delete(
  "/delete-job/:jobId",
  AuthMiddleware('admin', 'superAdmin'),
  JobController.deleteJob
);

const JobRoute = router;
export default JobRoute;
