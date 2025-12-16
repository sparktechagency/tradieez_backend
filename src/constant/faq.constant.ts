import { TFaqCategory } from "../interfaces/faq.interface";

export const FAQ_SEARCHABLE_FIELDS = [
    "question"
]

export const FAQ_VALID_FIELDS: string[] = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "isActive",
  "category"
];

export const FAQ_CATEGORY_VALUES : TFaqCategory[] = [
  'general', //General
  'account_profile', //Account & Profile
  'jobs_applications', //Jobs & Applications
  'payments_billing', //Payments & Billing
  'subscription', //Subscription
  'security_privacy', //Security & Privacy
  'technical_support' //Technical & Support
]