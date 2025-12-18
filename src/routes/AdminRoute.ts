import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import AdminController from '../controllers/AdminController';
import validationMiddleware from '../middlewares/validationMiddleware';
import { createAdminSchema, updateAdminSchema } from '../validation/admin.validation';
import upload from '../helper/upload';

const router = express.Router();

router.post(
  "/create-admin",
  AuthMiddleware(UserRole.superAdmin, UserRole.admin),
  validationMiddleware(createAdminSchema),
  AdminController.createAdmin
);
router.get("/get-admins",
  AuthMiddleware(UserRole.superAdmin),
  AdminController.getAdmins
)
router.patch(
  "/update-admin/:userId",
  AuthMiddleware(UserRole.superAdmin),
  validationMiddleware(updateAdminSchema),
  AdminController.updateAdmin
);
router.delete(
  "/delete-admin/:userId",
  AuthMiddleware(UserRole.superAdmin),
  AdminController.deleteAdmin
);
router.patch(
  "/update-admin-profile",
  AuthMiddleware(UserRole.admin),
  upload.single("image"),
  validationMiddleware(updateAdminSchema),
  AdminController.updateAdminProfile
);

const AdminRoute = router;
export default AdminRoute;