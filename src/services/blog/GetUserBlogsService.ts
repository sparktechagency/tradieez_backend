import { Types } from "mongoose";
import { TBlogQuery } from "../../interfaces/blog.interface";
import BlogModel from "../../models/BlogModel";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { BlogSearchableFields } from "../../constant/blog.constant";
import CustomError from "../../errors/CustomError";
import hasDuplicates from "../../utils/hasDuplicates";



const GetUserBlogsService = async (query: TBlogQuery) => {
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
        searchQuery = makeSearchQuery(searchTerm, BlogSearchableFields);
    }

    //5 setup filters
    let filterQuery = {};
    if (filters) {
        filterQuery = makeFilterQuery(filters);
    }



    //filter by category
    if (categoryId) {
        if (typeof categoryId === "string") {
            //check ObjectId
            if (!Types.ObjectId.isValid(categoryId)) {
                throw new CustomError(400, "categoryId must be valid ObjectId")
            }
            filterQuery = {
                ...filterQuery,
                categoryId: { $in: [new Types.ObjectId(categoryId)] }
            }
        }

        if (Array.isArray(categoryId)) {
            for (let i = 0; i < categoryId.length; i++) {
                if (!Types.ObjectId.isValid(categoryId[i])) {
                    throw new CustomError(400, "categoryId must be valid ObjectId")
                }
            }
            if (hasDuplicates(categoryId)) {
                throw new CustomError(400, "categoryId can not be duplicate value")
            }
            const categoryObjectIds = categoryId?.map(id => Types.ObjectId.createFromHexString(id));
            filterQuery = {
                ...filterQuery,
                categoryId: { $in: categoryObjectIds }
            }
        }
    }



    const result = await BlogModel.aggregate([
        {
            $match: {
                status: "visible"
            }
        },
        {
            $lookup: {
                from: "blogcategories",
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
                _id: 1,
                title: 1,
                categoryId:"$categoryId",
                category: "$category.name",
                image: "$image",
                view: "$view",
                description: "$description",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
            },
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
    ])
    .collation({ locale: "en", strength: 2 });

    // total count
    const totalCountResult = await BlogModel.aggregate([
        {
            $match: {
                status: "visible"
            }
        },
        {
            $lookup: {
                from: "blogcategories",
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
                _id: 1,
                title: 1,
                categoryId: "$categoryId",
                category: "$category.name",
                image: "$image",
                view: "$view",
                description: "$description",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt"
            },
        },
        {
            $match: {
                ...searchQuery,
                ...filterQuery,
            }
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


export default GetUserBlogsService;