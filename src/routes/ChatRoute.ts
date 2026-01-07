import express from "express";
import validationMiddleware from "../middlewares/validationMiddleware";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import { createChatSchema } from "../validation/chat.validation";
import ChatController from "../controllers/ChatController";

const router = express.Router();

router.post(
  "/create-chat",
  AuthMiddleware(UserRole.candidate, UserRole.employer),
  validationMiddleware(createChatSchema),
  ChatController.createChat
);
router.get(
  "/get-chats",
  AuthMiddleware(UserRole.candidate, UserRole.employer),
  ChatController.getChats
);

const ChatRoute = router;
export default ChatRoute;
