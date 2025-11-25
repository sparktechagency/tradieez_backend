import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import validationMiddleware from "../middlewares/validationMiddleware";
import { createCategoryValidationSchema, updateCategoryValidationSchema } from "../validation/category.validation";
import BlogCategoryController from "../controllers/BlogCatgoryController";

const router = express.Router();


router.post(
  "/create-category",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(createCategoryValidationSchema),
  BlogCategoryController.createBlogCategory
);

router.get(
  '/get-categories',
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  BlogCategoryController.getBlogCategories
);

router.get(
  '/get-category-drop-down',
  BlogCategoryController.getBlogCategoryDropDown
);
router.get(
  '/get-category-options',
  AuthMiddleware("admin", "superAdmin"),
  BlogCategoryController.getBlogCategoryOptions
);

router.patch(
  "/update-category/:categoryId",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(updateCategoryValidationSchema),
  BlogCategoryController.updateBlogCategory
);

router.delete(
  "/delete-category/:categoryId",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  BlogCategoryController.deleteBlogCategory
);

const BlogCategoryRoute = router;
export default BlogCategoryRoute;
