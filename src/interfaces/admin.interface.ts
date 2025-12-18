import { Document, Types } from "mongoose";

export interface IAdmin extends Document {
    userId: Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    profileImg?: string;
}

export interface IAdminPayload {
    fullName: string;
    email: string;
    phone: string;
    profileImg?: string;
    password?: string;
}

export type TAdminQuery = {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    status?: string,
}

