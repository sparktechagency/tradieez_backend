import { Types } from "mongoose";

export interface IAdmin {
    userId: Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    profileImg?: string;
}