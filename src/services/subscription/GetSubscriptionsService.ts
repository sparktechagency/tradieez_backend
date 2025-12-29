import { SUBSCRIPTION_SEARCHABLE_FIELDS } from "../../constant/subscription.constant";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TSubscriptionQuery } from "../../interfaces/subscription.interface";
import SubscriptionModel from "../../models/SubscriptionModel";

const GetSubscriptionsService = async (query: TSubscriptionQuery) => {
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
        searchQuery = makeSearchQuery(searchTerm, SUBSCRIPTION_SEARCHABLE_FIELDS);
    }

    //5. setup filters
    let filterQuery = {};
    if (filters) {
        filterQuery = makeFilterQuery(filters);
    }


    const result = await SubscriptionModel.aggregate([
        {
            $match: {
                ...searchQuery,
                ...filterQuery
            },
        },
        { $sort: { [sortBy]: sortDirection } },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                duration: 1,
                validity: 1,
                features: 1,
                status: 1
            },
        },
        { $skip: skip },
        { $limit: Number(limit) },
    ]).collation({ locale: "en", strength: 2 });

    // total count
    const totalCountResult = await SubscriptionModel.aggregate([
        {
            $match: {
                ...searchQuery,
                ...filterQuery
            }
        },
        { $count: "totalCount" }
    ])

    const totalCount = totalCountResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / Number(limit));

    return {
        meta: {
            page: Number(page), //currentPage
            limit: Number(limit),
            totalPages,
            total: totalCount,
        },
        data: result,
    };
};

export default GetSubscriptionsService;