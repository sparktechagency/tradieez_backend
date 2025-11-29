import { JobValidFields } from "../constant/job.constant";
import CreateJobService from "../services/job/CreateJobService";
import DeleteJobService from "../services/job/DeleteJobService";
import DeleteMyJobService from "../services/job/DeleteMyJobService";
import GetCandidateJobsService from "../services/job/GetCandidateJobsService";
import GetJobService from "../services/job/GetJobService";
import GetJobsService from "../services/job/GetJobsService";
import GetMyJobsService from "../services/job/GetMyJobsService";
import GetMySingleJobService from "../services/job/GetMySingleJobService";
import GetSingleJobService from "../services/job/GetSingleJobService";
import UpdateJobStatusService from "../services/job/UpdateJobStatusService";
import UpdateMyJobService from "../services/job/UpdateMyJobService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";



const createJob = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const result = await CreateJobService(userId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Job is published successfully",
        data: result
    })
})

const getMyJobs = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const validatedQuery = pickValidFields(req.query, JobValidFields);
    const result = await GetMyJobsService(userId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: "Jobs are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

const getCandidateJobs = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, JobValidFields);
    const result = await GetCandidateJobsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: "Jobs are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

const getJobs = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, JobValidFields);
    const result = await GetJobsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: "Jobs are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})


const updateMyJob = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const { jobId } = req.params;
    const result = await UpdateMyJobService(userId as string, jobId as string, req.body);
    res.status(200).json({
        success: true,
        message: 'Job is updated successfully',
        data: result
    })
})
const updateJobStatus = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const result = await UpdateJobStatusService(jobId as string, req.body);
    res.status(200).json({
        success: true,
        message: 'Job is updated successfully',
        data: result
    })
})


const getMySingleJob = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const { jobId } = req.params;
    const result = await GetMySingleJobService(userId as string, jobId as string);
    res.status(200).json({
        success: true,
        message: "Job is retrieved successfully",
        data: result
    })
})

const getJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const result = await GetJobService(jobId as string);
    res.status(200).json({
        success: true,
        message: "Job is retrieved successfully",
        data: result
    })
})

const getSingleJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const result = await GetSingleJobService(jobId as string);
    res.status(200).json({
        success: true,
        message: "Job is retrieved successfully",
        data: result
    })
})

const deleteMyJob = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const { jobId } = req.params;
    const result = await DeleteMyJobService(userId as string, jobId as string);
    res.status(200).json({
        success: true,
        message: 'Job is deleted successfully',
        data: result
    })
})

const deleteJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;
    const result = await DeleteJobService(jobId as string);
    res.status(200).json({
        success: true,
        message: 'Job is deleted successfully',
        data: result
    })
})

const JobController = {
    createJob,
    getMyJobs,
    getCandidateJobs,
    getJobs,
    updateMyJob,
    getMySingleJob,
    getJob,
    getSingleJob,
    updateJobStatus,
    deleteMyJob,
    deleteJob
}

export default JobController;