import { EmployerValidFields } from "../constant/user.constant";
import GetCandidatesService from "../services/user/GetCandidatesService";
import GetEmployersService from "../services/user/GetEmployersService";
import GetSingleCandidateService from "../services/user/GetSingleCandidateService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";


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


const getSingleCandidate = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const result = await GetSingleCandidateService(userId as string);
    res.status(200).json({
        success: true,
        message: 'Candidate is retrieved successfully',
        data: result
    })
})



const UserController = {
    getEmployers,
    getCandidates,
    getSingleCandidate
}

export default UserController;