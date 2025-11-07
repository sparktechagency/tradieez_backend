import { Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  replyMessage?: string;
  replyAt?: Date;
};

export type TContactQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string,
};
