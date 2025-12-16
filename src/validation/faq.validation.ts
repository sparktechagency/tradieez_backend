import { z } from 'zod';
import { FAQ_CATEGORY_VALUES } from '../constant/faq.constant';
import { TFaqCategory } from '../interfaces/faq.interface';

export const createFaqValidationSchema = z.object({
  question: z
    .string({
      required_error: "question is required",
    })
    .min(1, "Question is required")
    .trim()
    .regex(/^.*\?$/, {
      message:
        "Question must end with a question mark (?)",
    }),
  answer: z
    .string({
      required_error: "answer is required !"
    })
    .trim()
    .min(1, "answer is required !"),
  category: z
    .string({
      invalid_type_error: "category must be a valid string value.",
    })
    .refine((val) => FAQ_CATEGORY_VALUES.includes(val as TFaqCategory), {
      message: `category must be one of: ${FAQ_CATEGORY_VALUES.map((cv) => `'${cv}'`).join(",")}`,
    })
    .default("general"),
});

export const updateFaqValidationSchema = z.object({
  question: z
    .string({
      required_error: "question is required",
    })
    .min(1, "Question is required")
    .trim()
    .regex(/^.*\?$/, {
      message:
        "Question must end with a question mark (?)",
    })
    .optional(),
  answer: z.
    string({
      invalid_type_error: "answer must be string value",
      required_error: "answer is required !"
    }).optional(),
  category: z
    .string({
      invalid_type_error: "category must be a valid string value.",
    })
    .refine((val) => FAQ_CATEGORY_VALUES.includes(val as TFaqCategory), {
      message: `category must be one of: ${FAQ_CATEGORY_VALUES.map((cv) => `'${cv}'`).join(",")}`,
    })
    .optional(),
  isActive: z.
    boolean({
      invalid_type_error: "isActive must be boolean value"
    }).optional()
});