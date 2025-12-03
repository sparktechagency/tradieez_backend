import { APPLICATION_VALID_Fields } from "../constant/application.constant";
import ApplyJobService from "../services/application/ApplyJobService";
import DeleteApplicationService from "../services/application/DeleteApplicationService";
import GetApplicationsByJobIdService from "../services/application/GetApplicationsByJobIdService";
import GetApplicationsService from "../services/application/GetApplicationsService";
import GetAppliedJobIdsService from "../services/application/GetAppliedJobIdsService";
import GetAppliedJobsService from "../services/application/GetAppliedJobsService";
import UpdateApplicationService from "../services/application/UpdateApplicationService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";



const applyJob = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const result = await ApplyJobService(userId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Applied successfully",
        data: result
    })
})

const getAppliedJobs = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const validatedQuery = pickValidFields(req.query, APPLICATION_VALID_Fields);
    const result = await GetAppliedJobsService(userId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Applied jobs are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getAppliedJobIds = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const result = await GetAppliedJobIdsService(userId as string);
    res.status(200).json({
        success: true,
        message: 'Applied job ids retrieved successfully',
        data: result
    })
})

const getApplications = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const validatedQuery = pickValidFields(req.query, APPLICATION_VALID_Fields);
    const result = await GetApplicationsService(userId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Applied jobs are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getApplicationsByJobId = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const { jobId } = req.params;
    const validatedQuery = pickValidFields(req.query, APPLICATION_VALID_Fields);
    const result = await GetApplicationsByJobIdService(userId as string, jobId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Applied jobs are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const updateApplication = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const { applicationId } = req.params;
    const result = await UpdateApplicationService(userId as string, applicationId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Application is updated successfully",
        data: result
    })
})

const deleteApplication = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const { applicationId } = req.params;
    const result = await DeleteApplicationService(userId as string, applicationId as string);
    res.status(200).json({
        success: true,
        message: "Application is deleted successfully",
        data: result
    })
})

const ApplicationController = {
    applyJob,
    getAppliedJobs,
    getAppliedJobIds,
    getApplications,
    getApplicationsByJobId,
    updateApplication,
    deleteApplication
}

export default ApplicationController;