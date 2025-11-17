import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import CategoryController from "../controllers/CategoryController";
import validationMiddleware from "../middlewares/validationMiddleware";
import { createCategoryValidationSchema } from "../validation/category.validation";
import upload from "../helper/upload";

const router = express.Router();


router.post(
  "/create-category",
  upload.single("image"),
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(createCategoryValidationSchema),
  CategoryController.createCategory
);

router.get(
  '/get-categories',
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  CategoryController.getCategories
);
router.get(
  '/get-category-drop-down',
  CategoryController.getCategoryDropDown
);

const CategoryRoute = router;
export default CategoryRoute;
