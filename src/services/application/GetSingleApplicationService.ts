import { Types } from "mongoose";
import CustomError from "../../errors/CustomError";
import ApplicationModel from "../../models/ApplicationModel";
import isNotObjectId from "../../utils/isNotObjectId";


const GetSingleApplicationService = async (loginEmployerUserId: string, applicationId: string) => {
    if (isNotObjectId(applicationId)) {
        throw new CustomError(400, "applicationId must be a valid ObjectId")
    }


    const result = await ApplicationModel.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(applicationId),
                employerUserId: new Types.ObjectId(loginEmployerUserId)
            }
        },
        {
            $lookup: {
                from: "candidates",
                localField: "candidateUserId",
                foreignField: "userId",
                as: "candidate"
            }
        },
        {
            $unwind: "$candidate"
        },
        {
            $lookup: {
                from: "jobs",
                localField: "jobId",
                foreignField: "_id",
                as: "job"
            }
        },
        {
            $unwind: "$job"
        },
        {
            $lookup: {
                from: "categories",
                localField: "job.categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $project: {
                jobId: "$jobId",
                title: "$job.title",
                category: "$category.name",
                startDate: "$job.startDate",
                endDate: "$job.endDate",
                deadline: "$job.deadline",
                minRange: "$job.minRange",
                maxRange: "$job.maxRange",
                address: "$job.address",
                postalCode: "$job.postalCode",
                experience: "$job.experience",
                jobType: "$job.jobType",
                rateType: "$job.rateType",
                benefits: "$job.benefits",
                skills: "$job.skills",
                description: "$job.description",
                candidateUserId: "$candidateUserId",
                candidateName: "$candidate.fullName",
                candidateEmail: "$candidate.email",
                candidatePhone: "$candidate.phone",
                candidateImg: "$candidate.profileImg",
                status: '$status',
                workStatus: "$workStatus",
                createdAt: "$createdAt",
            }
        },
    ])

     if (result.length===0) {
        throw new CustomError(404, 'Application not found with the provided ID');
    }

    return result[0];
}


export default GetSingleApplicationService;