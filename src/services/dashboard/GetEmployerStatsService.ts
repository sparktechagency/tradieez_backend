import ApplicationModel from "../../models/ApplicationModel";
import JobModel from "../../models/Job.Model";


const GetEmployerStatsService = async (loginUserId: string) => {
    const totalJobs = await JobModel.countDocuments({
        userId: loginUserId
    })
    const totalApplications = await ApplicationModel.countDocuments({
        employerUserId: loginUserId
    })


    return {
        totalJobs,
        totalApplications
    }
}

export default GetEmployerStatsService;