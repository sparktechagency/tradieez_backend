import express from 'express';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { UserRole } from '../constant/user.constant';
import AdminController from '../controllers/AdminController';
import validationMiddleware from '../middlewares/validationMiddleware';
import { createAdminSchema, updateAdminSchema } from '../validation/admin.validation';

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

const AdminRoute = router;
export default AdminRoute;