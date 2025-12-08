import { Document, Types } from "mongoose";


export interface IEmployer extends Document {
  userId: Types.ObjectId;
  fullName: string;
  email: string;
  phone: string;
  profileImg: string;
  ratings: number;
  totalReviews: number;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  address: string;
  socialMedia: {
    website?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  }
  description?: string;
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