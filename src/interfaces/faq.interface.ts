import { Document } from "mongoose";

export type TFaqCategory = 'general' | 'account_profile' | 'jobs_applications' | 'payments_billing' | 'subscription' |'security_privacy' | 'technical_support';

export interface IFaq extends Document {
  question: string;
  slug: string;
  answer: string;
  category: TFaqCategory;
  isActive: boolean;
};

export type TFaqQuery = {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: string;
  category?: string;
};



