
import { Types } from "mongoose";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TJobQuery } from "../../interfaces/job.interface";
import JobModel from "../../models/Job.Model";
import { JOB_SEARCHABLE_FIELDS } from "../../constant/job.constant";

const GetMyJobsService = async (loginUserId: string, query: TJobQuery) => {
    const {
        searchTerm,
        page = 1,
        limit = 10,
        sortOrder = "desc",
        sortBy = "createdAt",
        categoryId,
        ...filters  // Any additional filters
    } = query;

    // 1. Set up pagination
    const skip = (Number(page) - 1) * Number(limit);

    //2. setup sorting
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    //3. setup searching
    let searchQuery = {};
    if (searchTerm) {
        searchQuery = makeSearchQuery(searchTerm, JOB_SEARCHABLE_FIELDS);
    }

    //4. setup filters
    let filterQuery = {};
    if (filters) {
        filterQuery = makeFilterQuery(filters);
    }

    //if categoryId is available
    if (categoryId) {
        filterQuery = {
            ...filterQuery,
            categoryId: new Types.ObjectId(categoryId)
        }
    }


    const result = await JobModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(loginUserId)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $lookup: {
                from: "applications",
                let: { jobID: "$_id" },   //$$jobID // <-- variable created here
                pipeline: [
                    { $match: { $expr: { $eq: ["$jobId", "$$jobID"] } } },
                    { $count: "count" },
                ],
                as: "applicationCount"
            }
        },
        {
            $addFields: {
                applications: {
                    $ifNull: [{ $arrayElemAt: ["$applicationCount.count", 0] }, 0]
                }
            }
        },
        {
            $project: {
                title: 1,
                categoryId: "$categoryId",
                "category": "$category.name",
                startDate: 1,
                endDate: 1,
                deadline: 1,
                minRange: 1,
                maxRange: 1,
                address: 1,
                postalCode: 1,
                experience: 1,
                jobType: 1,
                rateType: 1,
                applications: "$applications",
                status: '$status',
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
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
    const totalCountResult = await JobModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(loginUserId)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $project: {
                title: 1,
                categoryId: 1,
                "category": "$category.name",
                startDate: 1,
                endDate: 1,
                deadline: 1,
                minRange: 1,
                maxRange: 1,
                address: 1,
                postalCode: 1,
                experience: 1,
                jobType: 1,
                rateType: 1,
                status: '$status',
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
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

export default GetMyJobsService;