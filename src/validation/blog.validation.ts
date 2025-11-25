import z from "zod";
import isNotObjectId from "../utils/isNotObjectId";

export const createBlogSchema = z.object({
    title: z
        .string({
            invalid_type_error: "title must be string",
            required_error: "title is required",
        })
        .min(1, "title is required")
        .trim(),
    categoryId: z
        .string({
            invalid_type_error: "categoryId must be a string",
            required_error: "categoryId is required!",
        })
        .refine((id) => !isNotObjectId(id), {
            message: "categoryId must be a valid ObjectId",
        }),
    description: z
        .string({
            invalid_type_error: "description must be string",
            required_error: "description is required",
        })
        .min(1, "description is required")
        .trim()
});

export const updateBlogSchema = z.object({
    title: z
        .string({
            invalid_type_error: "title must be string",
            required_error: "title is required",
        })
        .trim()
        .min(1, "title is required")
        .optional(),
    categoryId: z
        .string({
            invalid_type_error: "categoryId must be a string",
            required_error: "categoryId is required!",
        })
        .refine((id) => !isNotObjectId(id), {
            message: "categoryId must be a valid ObjectId",
        })
        .optional(),
    description: z
        .string({
            invalid_type_error: "description must be string",
            required_error: "description is required",
        })
        .trim()
        .min(1, "description is required")
        .optional(),
    status: z
        .string({
            invalid_type_error: "status must be a valid string value.",
        })
        .refine((val) => ['visible', 'hidden'].includes(val), {
            message: "status must be one of: 'visible', 'hidden'",
        })
        .optional(),
});