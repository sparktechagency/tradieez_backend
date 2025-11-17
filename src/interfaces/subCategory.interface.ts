import { Types } from "mongoose";

export type TSubCategoryStatus = 'visible' | 'hidden';

export interface ISubCategory extends Document{
    categoryId: Types.ObjectId;
    name: string;
    slug: string; 
    status?: TSubCategoryStatus
}

export type ISubCategoryQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: TSubCategoryStatus
};
