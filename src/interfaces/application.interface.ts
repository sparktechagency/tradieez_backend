import { Types } from "mongoose";

export type TApplicationStatus = "applied" | "shortlisted" | "accepted" | "rejected" | "cancelled";
export type TWorkStatus = "pending" | 'running' | 'stopped' | 'completed';

export interface IApplication extends Document {
  jobId: Types.ObjectId;
  employerUserId: Types.ObjectId;
  candidateUserId: Types.ObjectId;
  cv: string;
  status: TApplicationStatus;
  workStatus: TWorkStatus;
};


export type TApplicationQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: TApplicationStatus;
  workStatus?: TWorkStatus;
}