

export const UserRole = {
    candidate: 'candidate',
    employer: 'employer',
    admin: "admin",
    superAdmin: 'superAdmin',
} as const;

export const EmployerSearchableFields = [ 'fullName', 'email', 'phone'];
export const CANDIDATE_SEARCHABLE_FIELDS = [ 'fullName', 'email', 'phone', 'address', 'postalCode'];

export const EmployerValidFields: string[] = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "status"
];

export const UserCandidateValidFields: string[] = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
];