import { Types } from "mongoose";


export interface IBlog extends Document {
    categoryId: Types.ObjectId;
    title: string;
    description: string;
    view: number;
    status: 'visible' | 'hidden'
}


export type TBlogQuery = {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    categoryId?: string;
    status?: 'visible' | 'hidden'
}