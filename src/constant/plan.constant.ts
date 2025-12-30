import { TDuration, TValidity } from "../interfaces/plan.interface";
export const PLAN_SEARCHABLE_FIELDS = ['name'];
export const DURATION_VALUES : TDuration[] = [30, 365];
export const VALIDITY_VALUES: TValidity[] = ['monthly', 'yearly'];

export const PLAN_VALID_FIELDS: string[] = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "status",
  "validity"
];