

import GetCandidateStatsService from "../services/dashboard/GetCandidateStatsService";
import GetEmployerStatsService from "../services/dashboard/GetEmployerStatsService";
import asyncHandler from "../utils/asyncHandler";


const getEmployerStats = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const result = await GetEmployerStatsService(userId as string);
    res.status(200).json({
        success: true,
        message: 'Stats are retrieved successfully',
        data: result
    })
})

const getCandidateStats = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const result = await GetCandidateStatsService(userId as string);
    res.status(200).json({
        success: true,
        message: 'Stats are retrieved successfully',
        data: result
    })
})


const DashboardController = {
    getEmployerStats,
    getCandidateStats
}

export default DashboardController