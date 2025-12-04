import { Types } from "mongoose";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import ApplicationModel from "../../models/ApplicationModel";
import { EMPLOYER_APPLICATION_SEARCHABLE_Fields } from "../../constant/application.constant";
import { TApplicationQuery } from "../../interfaces/application.interface";

const GetApplicationsService = async (loginEmployerUserId: string, query: TApplicationQuery) => {
    const {
        searchTerm,
        page = 1,
        limit = 10,
        sortOrder = "desc",
        sortBy = "createdAt",
        ...filters  // Any additional filters
    } = query;

    // 1. Set up pagination
    const skip = (Number(page) - 1) * Number(limit);

    //2. setup sorting
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    //3. setup searching
    let searchQuery = {};
    if (searchTerm) {
        searchQuery = makeSearchQuery(searchTerm, EMPLOYER_APPLICATION_SEARCHABLE_Fields);
    }

    //4. setup filters
    let filterQuery = {};
    if (filters) {
        filterQuery = makeFilterQuery(filters);
    }


    const result = await ApplicationModel.aggregate([
        {
            $match: {
                employerUserId: new Types.ObjectId(loginEmployerUserId),
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
                candidateUserId: "$candidateUserId",
                candidateName: "$candidate.fullName",
                candidateEmail: "$candidate.email",
                candidateImg: "$candidate.profileImg",
                status: '$status',
                workStatus: "$workStatus",
                createdAt: "$createdAt",
            }
        },
        {
            $match: {
                ...searchQuery,
                ...filterQuery
            },
        },
        { $sort: { [sortBy]: sortDirection } },
        { $skip: skip },
        { $limit: Number(limit) },
    ])
        .collation({ locale: "en", strength: 2 });

    // total count
    const totalCountResult = await ApplicationModel.aggregate([
         {
            $match: {
                employerUserId: new Types.ObjectId(loginEmployerUserId),
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
                postalCode: "$job.postalCode",
                experience: "$job.experience",
                jobType: "$job.jobType",
                rateType: "$job.rateType",
                candidateUserId: "$candidateUserId",
                candidateName: "$candidate.fullName",
                candidateEmail: "$candidate.email",
                status: '$status',
                workStatus: "$workStatus",
                createdAt: "$createdAt",
            }
        },
        {
            $match: {
                ...searchQuery,
                ...filterQuery
            },
        },
        { $count: "totalCount" }
    ])

    const totalCount = totalCountResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / Number(limit));

    return {
        meta: {
            page: Number(page),
            limit: Number(limit),
            totalPages,
            total: totalCount,
        },
        data: result,
    };
};

export default GetApplicationsService;