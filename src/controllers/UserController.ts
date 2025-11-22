import { EmployerValidFields, UserCandidateValidFields } from "../constant/user.constant";
import GetCandidatesService from "../services/user/GetCandidatesService";
import GetEmployersService from "../services/user/GetEmployersService";
import GetSingleCandidateService from "../services/user/GetSingleCandidateService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";
import GetFindCandidatesService from "../services/user/GetFindCandidatesService";
import { TUserRole } from "../interfaces/user.interface";
import GetMyProfileService from "../services/user/GetMyProfileService";
import UpdateCandidateProfileService from "../services/user/UpdateCandidateProfileService";
import GetCandidateService from "../services/user/GetCandidateService";


const getEmployers = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, EmployerValidFields);
    const result = await GetEmployersService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Employers are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getCandidates = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, EmployerValidFields);
    const result = await GetCandidatesService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Candidates are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const getFindCandidates = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, UserCandidateValidFields);
    const result = await GetFindCandidatesService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Candidates are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})


const getSingleCandidate = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await GetSingleCandidateService(userId as string);
    res.status(200).json({
        success: true,
        message: 'Candidate is retrieved successfully',
        data: result
    })
})

const getCandidate = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await GetCandidateService(userId as string);
    res.status(200).json({
        success: true,
        message: 'Candidate is retrieved successfully',
        data: result
    })
})


const getMyProfile = asyncHandler(async (req, res) => {
    const { userId, role } = req.headers;
    const result = await GetMyProfileService(userId as string, role as TUserRole);
    res.status(200).json({
        success: true,
        message: 'My profile is retrieved successfully',
        data: result
    })
})

const updateCandidateProfile = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const result = await UpdateCandidateProfileService(userId as string, req, req.body);
    res.status(200).json({
        success: true,
        message: 'Profile is updated successfully',
        data: result
    })
})



const UserController = {
    getEmployers,
    getCandidates,
    getFindCandidates,
    getSingleCandidate,
    getCandidate,
    getMyProfile,
    updateCandidateProfile
}

export default UserController;