import { ADMIN_VALID_FIELDS } from "../constant/admin.constant";
import CreateAdminService from "../services/admin/CreateAdminService";
import DeleteAdminService from "../services/admin/DeleteAdminService";
import GetAdminsService from "../services/admin/GetAdminsService";
import UpdateAdminProfileService from "../services/admin/UpdateAdminProfileService";
import UpdateAdminService from "../services/admin/UpdateAdminService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";



const createAdmin = asyncHandler(async (req, res) => {
    const result = await CreateAdminService(req.body);
    res.status(201).json({
        success: true,
        message: "Admin is created successfully",
        data: result
    })
})

const getAdmins = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, ADMIN_VALID_FIELDS);
    const result = await GetAdminsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: "Admins are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

const updateAdmin = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await UpdateAdminService(userId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Admin is updated successfully",
        data: result
    })
})

const deleteAdmin = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await DeleteAdminService(userId as string);
    res.status(200).json({
        success: true,
        message: "Admin is deleted successfully",
        data: result
    })
})

const updateAdminProfile = asyncHandler(async (req, res) => {
    const adminUserId = req.headers.userId;
    const result = await UpdateAdminProfileService(req, adminUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Admin Profile is updated successfully",
        data: result
    })
})



const AdminController = {
    createAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    updateAdminProfile
}
export default AdminController;