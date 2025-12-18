import { ADMIN_SEARCHABLE_Fields } from "../../constant/admin.constant";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TAdminQuery } from "../../interfaces/admin.interface";
import AdminModel from "../../models/AdminModel";

const GetAdminsService = async (query: TAdminQuery) => {
  // 1. Extract query parameters
  const {
    searchTerm,
    page = 1,
    limit = 10,
    sortOrder = "desc",
    sortBy = "createdAt",
    ...filters  // Any additional filters
  } = query;

  // 2. Set up pagination
  const skip = (Number(page) - 1) * Number(limit);

  //3. setup sorting
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  //4. setup searching
  let searchQuery = {};
  if (searchTerm) {
    searchQuery = makeSearchQuery(searchTerm, ADMIN_SEARCHABLE_Fields);
  }

  //5 setup filters
  let filterQuery = {};
  if (filters) {
    filterQuery = makeFilterQuery(filters);
  }

    const result = await AdminModel.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 0,
                userId:1,
                fullName: 1,
                email: 1,
                phone: 1,
                profileImg: 1,
                status: "$user.status",
                createdAt: "$createdAt"
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
    const totalCountResult = await AdminModel.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 0,
                userId: 1,
                fullName: 1,
                email: 1,
                phone: 1,
                profileImg: 1,
                status: "$user.status",
                createdAt: "$createdAt"
            }
        },
        {
            $match: {
                ...searchQuery,
                ...filterQuery
            },
        },
        { $count: "totalCount" }
    ]);

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

export default GetAdminsService;