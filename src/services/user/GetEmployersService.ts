import { EmployerSearchableFields } from "../../constant/user.constant";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TEmployerQuery } from "../../interfaces/employer.interface";
import EmployerModel from "../../models/EmployerModel";

const GetEmployersService = async (query: TEmployerQuery) => {
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
    searchQuery = makeSearchQuery(searchTerm, EmployerSearchableFields);
  }

  //4. setup filters
  let filterQuery = {};
  if (filters) {
    filterQuery = makeFilterQuery(filters);
  }
  const result = await EmployerModel.aggregate([
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
            fullName:1,
            email:1,
            phone:1,
            profileImg:1,
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
  const totalCountResult = await EmployerModel.aggregate([
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
            fullName:1,
            email:1,
            phone:1,
            profileImg:1,
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

export default GetEmployersService;