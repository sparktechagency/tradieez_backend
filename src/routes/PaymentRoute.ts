import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import PaymentController from '../controllers/PaymentController';
import validationMiddleware from '../middlewares/validationMiddleware';
import { initiatePaymentSchema } from '../validation/payment.validation';

const router = express.Router();

router.post(
  "/initiate-payment",
  AuthMiddleware(UserRole.employer),
  validationMiddleware(initiatePaymentSchema),
  PaymentController.initiatePayment
);

const PaymentRoute = router;
export default PaymentRoute;