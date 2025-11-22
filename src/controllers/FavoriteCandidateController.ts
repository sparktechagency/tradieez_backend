import { FavoriteCandidateValidFields } from "../constant/favoriteCandidate.constant";
import AddRemoveFavouriteCandidateService from "../services/favoriteCandidate/AddRemoveFavoriteCandidateService";
import GetFavoriteCandidateService from "../services/favoriteCandidate/GetFavoriteCandidatesService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";

const addRemoveFavoriteCandidate = asyncHandler(async (req, res) => {
    const { userId:loginEmployerUserId } = req.headers;
    const { candidateUserId } = req.body;
    const result = await AddRemoveFavouriteCandidateService(loginEmployerUserId as string, candidateUserId);
    res.status(200).json({
        success: true,
        message: result.message as string,
        data: result.data,
    })
})


const getFavoriteCandidates = asyncHandler(async (req, res) => {
    const { userId:loginEmployerUserId } = req.headers;
    const validatedQuery = pickValidFields(req.query, FavoriteCandidateValidFields);
    const result = await GetFavoriteCandidateService(loginEmployerUserId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Favorite candidates are retrieved successfully',
        meta: result.meta,
        data: result.data
    })
})

const FavoriteCandidateController = {
    addRemoveFavoriteCandidate,
    getFavoriteCandidates
}

export default FavoriteCandidateController;