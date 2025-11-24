import { JobValidFields } from "../constant/job.constant";
import CreateJobService from "../services/job/CreateJobService";
import GetCandidateJobsService from "../services/job/GetCandidateJobsService";
import GetMyJobsService from "../services/job/GetMyJobsService";
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


const JobController = {
    createJob,
    getMyJobs,
    getCandidateJobs,
    updateMyJob
}

export default JobController;