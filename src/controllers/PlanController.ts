import { PLAN_VALID_FIELDS } from "../constant/plan.constant";
import CreatePlanService from "../services/plan/CreatePlanService";
import DeletePlanService from "../services/plan/DeletePlanService";
import GetPlansService from "../services/plan/GetPlansService";
import GetUserPlansService from "../services/plan/GetUserPlansService";
import UpdatePlanService from "../services/plan/UpdatePlanService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";



const createPlan = asyncHandler(async (req, res) => {
    const result = await CreatePlanService(req.body);
    res.status(201).json({
        success: true,
        message: "Plan is created successfully",
        data: result
    })
})

const getPlans = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, PLAN_VALID_FIELDS);
    const result = await GetPlansService(validatedQuery);
    res.status(200).json({
        success: true,
        message: "Plans are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

const getUserPlans = asyncHandler(async (req, res) => {
    const result = await GetUserPlansService();
    res.status(200).json({
        success: true,
        message: "Plans are retrieved successfully",
        data: result
    })
})

const updatePlan = asyncHandler(async (req, res) => {
    const { planId } = req.params;
    const result = await UpdatePlanService(planId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Plan is updated successfully",
        data: result
    })
})

const deletePlan = asyncHandler(async (req, res) => {
    const { planId } = req.params;
    const result = await DeletePlanService(planId as string);
    res.status(200).json({
        success: true,
        message: "Plan is deleted successfully",
        data: result
    })
})

const PlanController = {
    createPlan,
    getPlans,
    getUserPlans,
    updatePlan,
    deletePlan
}

export default PlanController;