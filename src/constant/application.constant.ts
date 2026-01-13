import { TApplicationStatus, TWorkStatus } from "../interfaces/application.interface";

export const APPLICATION_STATUS_VALUES : TApplicationStatus[] = ["applied", "shortlisted", "accepted", "rejected", "cancelled"];
export const WORK_STATUS_VALUES : TWorkStatus[] = ["pending", "running", "completed", "stopped"];

export const APPLICATION_SEARCHABLE_Fields = ['title', 'employerName', 'employerEmail'];
export const EMPLOYER_APPLICATION_SEARCHABLE_Fields = ['title', 'candidateName', 'candidateEmail'];

export const APPLICATION_VALID_Fields: string[] = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "categoryId",
  "status",
  "workStatus"
];