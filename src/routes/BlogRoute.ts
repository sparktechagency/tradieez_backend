import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import validationMiddleware from "../middlewares/validationMiddleware";
import upload from "../helper/upload";
import { createBlogSchema, updateBlogSchema } from "../validation/blog.validation";
import BlogController from "../controllers/BlogController";

const router = express.Router();


router.post(
  "/create-blog",
  upload.single("image"),
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(createBlogSchema),
  BlogController.createBlog
);

router.get(
  '/get-user-blogs',
  BlogController.getUserBlogs
);
router.get(
  '/get-single-blog/:blogId',
  BlogController.getSingleBlog
);
router.get(
  '/get-blog/:blogId',
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  BlogController.getBlog
);
router.get(
  '/get-blogs',
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  BlogController.getBlogs
);

router.patch(
  "/update-blog/:blogId",
  upload.single("image"),
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(updateBlogSchema),
  BlogController.updateBlog
);

router.delete(
  "/delete-blog/:blogId",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  BlogController.deleteBlog
);

const BlogRoute = router;
export default BlogRoute;
