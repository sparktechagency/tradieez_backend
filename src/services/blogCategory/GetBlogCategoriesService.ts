import { CategorySearchableFields } from "../../constant/category.constant";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TCategoryQuery } from "../../interfaces/category.interface";
import BlogCategoryModel from "../../models/BlogCategoryModel";

const GetBlogCategoriesService = async (query: TCategoryQuery) => {
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
        searchQuery = makeSearchQuery(searchTerm, CategorySearchableFields);
    }

    //4. setup filters
    let filterQuery = {};
    if (filters) {
        filterQuery = makeFilterQuery(filters);
    }


    const result = await BlogCategoryModel.aggregate([
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
                status:1
            },
        },
        { $skip: skip },
        { $limit: Number(limit) },
    ]).collation({ locale: "en", strength: 2 });

    // total count
    const totalCountResult = await BlogCategoryModel.aggregate([
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

export default GetBlogCategoriesService;