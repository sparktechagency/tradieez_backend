import express from "express";
import { loginValidationSchema, verifyOtpValidationSchema } from "../validation/auth.validation";
import validationMiddleware from "../middlewares/validationMiddleware";
import AuthController from "../controllers/AuthController";
import { registerEmployerValidationSchema } from "../validation/employer.validation";

const router = express.Router();


router.post(
  "/register-employer",
  validationMiddleware(registerEmployerValidationSchema),
  AuthController.registerEmployer
);
router.post(
  "/verify-email",
  validationMiddleware(verifyOtpValidationSchema),
  AuthController.verifyEmail
);
router.post(
  "/login-user",
  validationMiddleware(loginValidationSchema),
  AuthController.loginUser
);
router.post(
  "/login-admin",
  validationMiddleware(loginValidationSchema),
  AuthController.loginAdmin
);



const AuthRoute = router;
export default AuthRoute;
