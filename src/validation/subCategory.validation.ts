/* eslint-disable no-useless-escape */
import z from "zod";
import isNotObjectId from "../utils/isNotObjectId";

export const createSubCategorySchema = z.object({
    name: z
        .string({
            invalid_type_error: "name must be string",
            required_error: "name is required",
        })
        .min(1, "name is required")
        .trim()
        .regex(/^[^0-9]*$/, {
            message: "name cannot contain numbers",
        })
        .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
            message: 'name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
        }),
    categoryId: z
        .string({
            invalid_type_error: "categoryId must be a string",
            required_error: "categoryId is required!",
        })
        .refine((id) => !isNotObjectId(id), {
            message: "categoryId must be a valid ObjectId",
        })
});

export const updateSubCategorySchema = z.object({
    name: z
        .string({
            invalid_type_error: "name must be string",
            required_error: "name is required",
        })
        .min(1, "name is required")
        .trim()
        .regex(/^[^0-9]*$/, {
            message: "name cannot contain numbers",
        })
        .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
            message: 'name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
        })
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
    status: z
        .string({
            invalid_type_error: "status must be a valid string value.",
        })
        .refine((val) => ['visible', 'hidden'].includes(val), {
            message: "status must be one of: 'visible', 'hidden'",
        })
        .optional(),
});