import { Document } from "mongoose";

export type TBlogCategoryStatus = 'visible' | 'hidden';

export interface IBlogCategory extends Document {
    name: string;
    slug: string;
    status: TBlogCategoryStatus
}


export type TBlogCategoryQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: TBlogCategoryStatus
};
