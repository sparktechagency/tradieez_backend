import { Document } from "mongoose";
import { TVisibility } from "../types/global.type";

export type TDuration = 30 | 365;
export type TValidity = "yearly" | "monthly";

export interface IPlan extends Document{
    name: string;
    slug: string;
    duration: TDuration;
    validity: TValidity;
    price: number;
    features: string[];
    description: string;
    status: TVisibility
}

export type TPlanQuery = {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    status?: string;
    validity?: string,
}