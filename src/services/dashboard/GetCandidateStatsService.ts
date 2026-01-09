import ApplicationModel from "../../models/ApplicationModel";
import FavoriteJobModel from "../../models/FavoriteJobModel";


const GetCandidateStatsService = async (loginUserId: string) => {
    const totalFavoriteJobs = await FavoriteJobModel.countDocuments({
        candidateUserId: loginUserId
    })
    const totalAppliedJobs = await ApplicationModel.countDocuments({
        candidateUserId: loginUserId
    })


    return {
        totalFavoriteJobs,
        totalAppliedJobs
    }
}

export default GetCandidateStatsService;