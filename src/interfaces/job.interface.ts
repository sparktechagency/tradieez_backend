import { Document, Types } from "mongoose";

export type TJobType = 'full_time' | 'part_time' | 'freelance' | 'contact';
export type TJobExperience = 'apprentice' | 'newly_qualified' | '1_3_years' | '3_5_years' | '5_years_plus' | 'n/a';
export type TJobRateType = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'annual';


export interface IJob extends Document{
    userId: Types.ObjectId;
    title: string;
    categoryId: Types.ObjectId;
    jobType: TJobType;
    experience: TJobExperience;
    startDate: Date;
    endDate?: Date;
    deadline: Date;
    skills: string[];
    benefits?: string;
    rateType: TJobRateType;
    minRange: number;
    maxRange: number;
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
    address: string;
    postalCode: string;
    description: string;
    status: 'visible' | 'hidden';
}


export interface IJobPayload{
    title: string;
    categoryId: Types.ObjectId;
    jobType: TJobType;
    experience: TJobExperience;
    startDate: Date;
    endDate?: Date;
    deadline: Date;
    skills: string[];
    benefits?: string;
    rateType: TJobRateType;
    minRange: number;
    maxRange: number;
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
    longitude: number;
    latitude: number;
    address: string;
    postalCode: string;
    description: string;
    status: 'visible' | 'hidden';
}



export type TJobQuery = {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    status?: string,
    categoryId?: Types.ObjectId;
    jobType?: TJobType;
    experience?: TJobExperience;
    rateType?: TJobRateType;
};