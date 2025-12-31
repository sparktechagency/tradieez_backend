
import { Types } from "mongoose";
import { PLAN_SEARCHABLE_FIELDS } from "../../constant/plan.constant";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TSubscriptionQuery } from "../../interfaces/subscription.interface";
import SubscriptionModel from "../../models/SubscriptionModel";
import getSubscriptionStatus from "../../utils/getSubscriptionStatus";

const GetMySubscriptionsService = async (employerUserId: string, query: TSubscriptionQuery) => {
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

    //3. setup sorting
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    //4. setup searching
    let searchQuery = {};
    if (searchTerm) {
        searchQuery = makeSearchQuery(searchTerm, PLAN_SEARCHABLE_FIELDS);
    }

    //5. setup filters
    let filterQuery = {};
    if (filters) {
        filterQuery = makeFilterQuery(filters);
    }


    const result = await SubscriptionModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(employerUserId),
                ...searchQuery,
                ...filterQuery
            },
        },
        {
            $lookup: {
                from: "plans",
                localField: "planId",
                foreignField: "_id",
                as: "plan"
            }
        },
        {
            $unwind: "$plan"
        },
        {
            $project: {
                _id: 1,
                amount: 1,
                startDate:1,
                endDate:1,
                planName: "$plan.name",
                duration: "$plan.duration",
                validity: "$plan.validity",
                features: "$plan.features",
                description: "$plan.description",
                paymentStatus: "$paymentStatus",
                createdAt: "$createdAt"
            },
        },
        { $sort: { [sortBy]: sortDirection } },
        { $skip: skip },
        { $limit: Number(limit) },
    ]).collation({ locale: "en", strength: 2 });


    // total count
    const totalCountResult = await SubscriptionModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(employerUserId),
                ...searchQuery,
                ...filterQuery
            }
        },
        { $count: "totalCount" }
    ])

    const totalCount = totalCountResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / Number(limit));

    //modified result
    const modifiedResult = result.length > 0 ? result.map(({ createdAt, ...rest }) => ({
        ...rest,
        status: getSubscriptionStatus(rest.paymentStatus, rest.endDate),
        createdAt: createdAt
    })) : [];

    return {
        meta: {
            page: Number(page), //currentPage
            limit: Number(limit),
            totalPages,
            total: totalCount,
        },
        data: modifiedResult,
    };
};

export default GetMySubscriptionsService;