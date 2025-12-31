import { TPaymentStatus } from "../interfaces/subscription.interface";

export const PAYMENT_STATUS_VALUES : TPaymentStatus[] = ["unpaid", "paid", "failed", "refunded"];

export const SUBSCRIPTION_VALID_FIELDS: string[] = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "paymentStatus",
  "status"
];