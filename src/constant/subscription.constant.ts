import { TPaymentStatus } from "../interfaces/subscription.interface";

export const PAYMENT_STATUS_VALUES : TPaymentStatus[] = ["unpaid", "paid", "failed", "refunded"];
export const EMPLOYER_SUBSCRIPTION_SEARCHABLE_FIELDS = ['planName', 'description'];
export const SUBSCRIPTION_SEARCHABLE_FIELDS = ['employerName', 'employerEmail', 'employerPhone'];

export const SUBSCRIPTION_VALID_FIELDS: string[] = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "paymentStatus",
  "status"
];