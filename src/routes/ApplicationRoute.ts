import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import ApplicationController from "../controllers/ApplicationController";
import validationMiddleware from "../middlewares/validationMiddleware";
import { applyJobSchema, updateApplicationSchema } from "../validation/application.validation";

const router = express.Router();

router.post(
  "/apply-job",
  AuthMiddleware(UserRole.candidate),
  validationMiddleware(applyJobSchema),
  ApplicationController.applyJob
);
router.get(
  "/get-applied-jobs",
  AuthMiddleware(UserRole.candidate),
  ApplicationController.getAppliedJobs
);
router.get(
  "/get-applied-job-ids",
  AuthMiddleware(UserRole.candidate),
  ApplicationController.getAppliedJobIds
);
router.get(
  "/get-single-applied-job/:jobId",
  AuthMiddleware(UserRole.candidate),
  ApplicationController.getSingleAppliedJob
);
router.get(
  "/get-applications",
  AuthMiddleware(UserRole.employer),
  ApplicationController.getApplications
);
router.get(
  "/get-applications/:jobId",
  AuthMiddleware(UserRole.employer),
  ApplicationController.getApplicationsByJobId
);
router.get(
  "/get-single-application/:applicationId",
  AuthMiddleware(UserRole.employer),
  ApplicationController.getSingleApplication
);
router.patch(
  "/update-application/:applicationId",
  AuthMiddleware(UserRole.employer),
  validationMiddleware(updateApplicationSchema),
  ApplicationController.updateApplication
);
router.delete(
  "/delete-application/:applicationId",
  AuthMiddleware(UserRole.employer),
  ApplicationController.deleteApplication
);


const ApplicationRoute = router;
export default ApplicationRoute;
