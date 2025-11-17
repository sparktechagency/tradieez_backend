import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import { UserRole } from "../constant/user.constant";
import validationMiddleware from "../middlewares/validationMiddleware";
import { createSubCategorySchema, updateSubCategorySchema } from "../validation/subCategory.validation";
import SubCategoryController from "../controllers/SubCategoryController";

const router = express.Router();


router.post(
  "/create-sub-category",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(createSubCategorySchema),
  SubCategoryController.createSubCategory
);

router.get(
  '/get-sub-categories',
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  SubCategoryController.getSubCategories
);
router.get(
  '/get-sub-category-drop-down/:categoryId',
  SubCategoryController.getSubCategoryDropDown
);
router.patch(
  "/update-sub-category/:subCategoryId",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  validationMiddleware(updateSubCategorySchema),
  SubCategoryController.updateSubCategory
);
router.delete(
  "/delete-sub-category/:subCategoryId",
  AuthMiddleware(UserRole.admin, UserRole.superAdmin),
  SubCategoryController.deleteSubCategory
);

const SubCategoryRoute = router;
export default SubCategoryRoute;
