import express from "express";
import { loginValidationSchema } from "../validation/auth.validation";
import validationMiddleware from "../middlewares/validationMiddleware";
import AuthController from "../controllers/AuthController";

const router = express.Router();


router.post(
  "/login-admin",
  validationMiddleware(loginValidationSchema),
  AuthController.loginAdmin
);



export const AuthRoutes = router;
