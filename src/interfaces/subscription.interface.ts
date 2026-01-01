/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export type TPaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';

export interface ISubscription extends Document {
    planId: Types.ObjectId;
    userId: Types.ObjectId;
    transactionId: string;
    amount: number;
    paymentId: string;
    stripeFee: number;
    netAmount: number;
    paymentStatus: TPaymentStatus;
    paymentDetails: any;
    startDate: Date;
    endDate: Date;
}


export type TSubscriptionQuery = {
    searchTerm?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    status?: 'pending' | 'active' | 'expired',
    paymentStatus?: TPaymentStatus;
};