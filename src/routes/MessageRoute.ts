import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import MessageController from "../controllers/MessageController";

const router = express.Router();


router.post(
  "/send-message",
   AuthMiddleware(UserRole.candidate, UserRole.employer),
  MessageController.sendMessage
);
router.get(
  "/get-messages/:chatId",
  AuthMiddleware(UserRole.candidate, UserRole.employer),
  MessageController.getMessages
);

const MessageRoute = router;
export default MessageRoute;
