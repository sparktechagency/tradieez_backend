/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export type TPaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface IPayment extends Document {
    subscriptionId: Types.ObjectId;
    userId: Types.ObjectId;
    amount: number;
    transactionId: string;
    paymentStatus: TPaymentStatus;
    paymentDetails: any;
    startDate: Date;
    endDate: Date;
}