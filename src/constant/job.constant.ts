import { TJobExperience, TJobRateType, TJobType } from "../interfaces/job.interface";

export const JOB_SEARCHABLE_FIELDS = ['title', 'address', 'postalCode', 'category', 'employerName', 'employerPhone', 'employerEmail'];
export const JOB_TYPE_VALUES: TJobType[] = ['full_time', 'part_time', 'freelance', 'contact'];
export const JOB_EXPERIENCE_VALUES: TJobExperience[] = ['apprentice', 'newly_qualified', '1_3_years', '3_5_years', '5_years_plus', 'n/a'];
export const JOB_RATE_VALUES: TJobRateType[] = ['hourly', 'daily', 'weekly', 'monthly', 'annual'];

export const JobValidFields: string[] = [
    "searchTerm",
    "searchByTitle",
    "searchByLocation",
    "searchByPostalCode",
    "page",
    "limit",
    "sortBy",
    "sortOrder",
    "status",
    "categoryId",
    "jobType",
    "experience",
    "rateType"
];
