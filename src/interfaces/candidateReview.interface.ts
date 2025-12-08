import { Document, Types } from "mongoose";

export interface ICandidateReview extends Document{
    jobId: Types.ObjectId;
    candidateUserId: Types.ObjectId;
    employerUserId: Types.ObjectId;
    star: number;
    comment: string;
    isHidden: boolean;
}

export type TCandidateReviewQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  star?: string,
};
