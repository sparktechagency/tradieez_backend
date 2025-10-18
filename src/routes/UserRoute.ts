import express from "express";
import { UserController } from "../controllers/UserController";


const router = express.Router();

router.get("/get-my-profile", UserController.getProfile)


export default router;