import { Types } from "mongoose";


export interface IFavoriteCandidate{
    employerUserId: Types.ObjectId;
    candidateUserId: Types.ObjectId;
}



export type TFavoriteCandidateQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};