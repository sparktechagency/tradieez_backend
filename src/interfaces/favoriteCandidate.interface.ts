import { Types } from "mongoose";


export interface IFavouriteCandidate{
    userId: Types.ObjectId;
    productId: Types.ObjectId;
}

export type TFavouriteCandidateQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};