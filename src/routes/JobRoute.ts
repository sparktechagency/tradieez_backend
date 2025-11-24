import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { createJobValidationSchema, updateJobValidationSchema } from "../validation/job.validation";
import JobController from "../controllers/JobController";

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
router.patch(
  "/update-my-job/:jobId",
  AuthMiddleware('employer'),
  validationMiddleware(updateJobValidationSchema),
  JobController.updateMyJob
);


const JobRoute = router;
export default JobRoute;
