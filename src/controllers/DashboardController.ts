import GetCandidateStatsService from "../services/dashboard/GetCandidateStatsService";
import GetEmployerStatsService from "../services/dashboard/GetEmployerStatsService";
import GetIncomeOverviewService from "../services/dashboard/GetIncomeOverviewService";
import GetStatsService from "../services/dashboard/GetStatsService";
import GetUserOverviewService from "../services/dashboard/GetUserOverviewService";
import asyncHandler from "../utils/asyncHandler";

const getEmployerStats = asyncHandler(async (req, res) => {
  const { userId } = req.headers;
  const result = await GetEmployerStatsService(userId as string);
  res.status(200).json({
    success: true,
    message: "Stats are retrieved successfully",
    data: result,
  });
});

const getCandidateStats = asyncHandler(async (req, res) => {
  const { userId } = req.headers;
  const result = await GetCandidateStatsService(userId as string);
  res.status(200).json({
    success: true,
    message: "Stats are retrieved successfully",
    data: result,
  });
});

const getUserOverview = asyncHandler(async (req, res) => {
  const { year } = req.params;
  const result = await GetUserOverviewService(year as string);
  res.status(200).json({
    success: true,
    message: "User overview is retrieved successfully",
    data: result,
  });
});

const getIncomeOverview = asyncHandler(async (req, res) => {
  const { year } = req.params;
  const result = await GetIncomeOverviewService(year as string);
  res.status(200).json({
    success: true,
    message: "Income overview is retrieved successfully",
    data: result,
  });
});

const getStats = asyncHandler(async (req, res) => {
  const result = await GetStatsService();
  res.status(200).json({
    success: true,
    message: "Stats are retrieved successfully",
    data: result,
  });
});


const DashboardController = {
  getEmployerStats,
  getCandidateStats,
  getUserOverview,
  getIncomeOverview,
  getStats
};

export default DashboardController;
