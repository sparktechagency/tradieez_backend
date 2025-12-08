import { Types } from "mongoose";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TFavoriteJobQuery } from "../../interfaces/favoriteJob.interface";
import EmployerReviewModel from "../../models/EmployerReviewModel";
import { EMPLOYER_REVIEW_SEARCHABLE_FIELDS } from "../../constant/employerReview.constant";

const GetMyReviewsService = async (loginCandidateUserId: string, query: TFavoriteJobQuery) => {

    // 1. Extract query parameters
    const {
        searchTerm,
        page = 1,
        limit = 10,
        sortOrder = "desc",
        sortBy = "createdAt",
        ...filters // Any additional filters
    } = query;


    // 2. Set up pagination
    const skip = (Number(page) - 1) * Number(limit);

    //3. setup sorting
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    //4. setup searching
    let searchQuery = {};
    if (searchTerm) {
        searchQuery = makeSearchQuery(searchTerm, EMPLOYER_REVIEW_SEARCHABLE_FIELDS);
    }

    //5 setup filters
    let filterQuery = {};
    if (filters) {
        filterQuery = makeFilterQuery(filters);
    }


    const result = await EmployerReviewModel.aggregate([
        {
            $match: {
                candidateUserId: new Types.ObjectId(loginCandidateUserId),
            }
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
            $project: {
                _id: 0,
                jobId: "$jobId",
                title: "$job.title",
                employerUserId: "$employerUserId",
                employerName: "$employer.fullName",
                employerEmail: "$employer.email",
                employerPhone: "$employer.phone",
                employerImg: "$employer.profileImg",
                star: "$star",
                comment: "$comment",
                createdAt: "$createdAt",
            }
        },
        {
            $match: {
                ...searchQuery,
                ...filterQuery,
            }
        },
        { $sort: { [sortBy]: sortDirection } },
        { $skip: skip },
        { $limit: Number(limit) },
    ]);


    //count total for pagination
    const totalResultCount = await EmployerReviewModel.aggregate([
        {
            $match: {
                candidateUserId: new Types.ObjectId(loginCandidateUserId),
            }
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
            $project: {
                _id: 0,
                jobId: "$jobId",
                title: "$job.title",
                employerUserId: "$employerUserId",
                employerName: "$employer.fullName",
                employerEmail: "$employer.email",
                employerPhone: "$employer.phone",
                employerImg: "$employer.profileImg",
                star: "$star",
                comment: "$comment",
                createdAt: "$createdAt",
            }
        },
        {
            $match: {
                ...searchQuery,
                ...filterQuery,
            }
        },
        { $count: "totalCount" },
    ]);


    const totalCount = totalResultCount[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / Number(limit));


    return {
        meta: {
            page: Number(page), //currentPage
            limit: Number(limit),
            totalPages,
            total: totalCount,
        },
        data: result
    };

}



export default GetMyReviewsService