import express from "express";
import { changePasswordSchema, emailValidationSchema, forgotPasswordSetNewPassSchema, loginValidationSchema, refreshTokenValidationSchema, verifyOtpValidationSchema } from "../validation/auth.validation";
import validationMiddleware from "../middlewares/validationMiddleware";
import AuthController from "../controllers/AuthController";
import { registerEmployerValidationSchema } from "../validation/employer.validation";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";

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
  "/resend-verification-email",
  validationMiddleware(emailValidationSchema),
  AuthController.resendVerificationEmail
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


//forgot password
// step-01
router.post(
  "/forgot-password-send-otp",
  validationMiddleware(emailValidationSchema),
  AuthController.forgotPasswordSendOtp
);
// step-02
router.post(
  "/forgot-password-verify-otp",
  validationMiddleware(verifyOtpValidationSchema),
  AuthController.forgotPasswordVerifyOtp
);
// step-03
router.post(
  "/forgot-password-set-new-password",
  validationMiddleware(forgotPasswordSetNewPassSchema),
  AuthController.forgotPasswordSetNewPassword
);

router.patch(
  "/change-password",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin, UserRole.candidate, UserRole.employer),
  validationMiddleware(changePasswordSchema),
  AuthController.changePassword
);
router.post(
  "/refresh-token",
  validationMiddleware(refreshTokenValidationSchema),
  AuthController.refreshToken
);


const AuthRoute = router;
export default AuthRoute;
