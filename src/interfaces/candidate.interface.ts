import { Document, Types } from "mongoose";


export type TWorkRate = 'per_hour' | 'per_day' | 'per_job';
export type TWorkType = 'full_time' | 'part_time' | 'gig' | 'evenings_weekends';
export type TEmploymentType = 'self_employed' | 'seeking_employed' | 'both';
export type TExperience = 'entry' | 'mid' | 'senior' | 'expert';

export interface ICandidate extends Document {
    userId: Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    profileImg: string;
    categoryId: Types.ObjectId;
    subCategoryId: Types.ObjectId;
    ratings: number;
    totalReviews: number;
    workRate: TWorkRate;
    workType: TWorkType;
    availableDate: Date;
    employmentType: TEmploymentType;
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
    address: string;
    postalCode: string;
    city: string;
    skills: string[];
    experience: TExperience,
    isPrivate: boolean,
    description: string;
    dateOfBirth: Date;
}


export interface IUpdateCandidatePayload {
    fullName: string;
    phone: string;
    profileImg: string;
    categoryId: Types.ObjectId;
    subCategoryId: Types.ObjectId;
    ratings: number;
    workRate: TWorkRate;
    workType: TWorkType;
    availableDate: Date;
    employmentType: TEmploymentType;
    location: {
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
    };
    longitude: number;
    latitude: number;
    address: string;
    skills: string[];
    experience: TExperience;
    isPrivate: boolean;
    description: string;
    dateOfBirth: Date;
}