import { FAQ_SEARCHABLE_FIELDS } from "../../constant/faq.constant";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TFaqQuery } from "../../interfaces/faq.interface";
import FaqModel from "../../models/Faq.model";

const GetFaqsService = async (query: TFaqQuery) => {
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
    searchQuery = makeSearchQuery(searchTerm, FAQ_SEARCHABLE_FIELDS);
  }

  //5 setup filters
  let filterQuery = {};
  if (filters) {
    filterQuery = makeFilterQuery(filters);
  }

  const result = await FaqModel.aggregate([
    {
      $match: {
        ...searchQuery,
        ...filterQuery
      }
    },
    { $sort: { [sortBy]: sortDirection } },
    {
      $project: {
        slug: 0,
        createdAt: 0,
        updatedAt: 0
      }
    },
    { $skip: skip },
    { $limit: Number(limit) },
  ]);




  // total count
  const totalCountResult = await FaqModel.aggregate([
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
}

export default GetFaqsService;