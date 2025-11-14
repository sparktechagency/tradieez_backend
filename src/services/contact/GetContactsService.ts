import { ContactSearchableFields } from "../../constant/contact.constant";
import { makeFilterQuery, makeSearchQuery } from "../../helper/QueryBuilder";
import { TContactQuery } from "../../interfaces/contact.interface";
import ContactModel from "../../models/ContactModel";

const GetContactsService = async (query: TContactQuery) => {
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
    searchQuery = makeSearchQuery(searchTerm, ContactSearchableFields);
  }

  //4. setup filters
  let filterQuery = {};
  if (filters) {
    filterQuery = makeFilterQuery(filters);
  }
  const result = await ContactModel.aggregate([
    {
      $match: {
        ...searchQuery, 
        ...filterQuery
      },
    },
    {
      $project: {
        updatedAt: 0
      },
    },
    { $sort: { [sortBy]: sortDirection } }, 
    { $skip: skip }, 
    { $limit: Number(limit) }, 
  ]);

     // total count
  const totalCountResult = await ContactModel.aggregate([
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
    page: Number(page),
    limit: Number(limit),
    totalPages,
    total: totalCount,
  },
  data: result,
};
};

export default GetContactsService;