import { Types } from "mongoose";
import CustomError from "../../errors/CustomError";
import ApplicationModel from "../../models/ApplicationModel";
import JobModel from "../../models/Job.Model";
import isNotObjectId from "../../utils/isNotObjectId";

const GetSingleAppliedJobService = async (loginCandidateUserId: string, jobId: string) => {
    if (isNotObjectId(jobId)) {
        throw new CustomError(400, "jobId must be a valid ObjectId")
    }

    //check job
    const job = await JobModel.findOne({ _id: jobId });
    if (!job) {
        throw new CustomError(404, 'Job not found with the provided ID');
    }

    const result = await ApplicationModel.aggregate([
        {
            $match: {
                candidateUserId: new Types.ObjectId(loginCandidateUserId),
                jobId: new Types.ObjectId(jobId),
            }
        },
        {
            $lookup: {
                from: "employers",
                localField: "employerUserId",
                foreignField: "userId",
                as: "employer"
            }
        },
        {
            $unwind: "$employer"
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
                _id: 0,
                jobId: "$jobId",
                title: "$job.title",
                category: "$category.name",
                startDate: "$job.startDate",
                endDate: "$job.endDate",
                deadline: "$job.deadline",
                minRange: "$job.minRange",
                maxRange: "$job.maxRange",
                address: "$job.address",
                benefits: "$benefits",
                postalCode: "$job.postalCode",
                experience: "$job.experience",
                jobType: "$job.jobType",
                rateType: "$job.rateType",
                skills: "$skills",
                description: "$description",
                employerUserId: "$employerUserId",
                employerName: "$employer.fullName",
                employerEmail: "$employer.email",
                employerPhone: "$employer.phone",
                employerImg: "$employer.profileImg",
                status: '$status',
                workStatus: "$workStatus",
                createdAt: "$createdAt",
            }
        }
    ])

    if (result.length === 0) {
        throw new CustomError(404, 'Applied-job not found with the provided ID');
    }

    return result[0]

}

export default GetSingleAppliedJobService;