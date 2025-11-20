import { Document, Types } from "mongoose";


export interface IEmployer extends Document{
    userId: Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    profileImg: string;
    ratings: number;
}

export type TEmployerQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string,
  ratings?:number;
};