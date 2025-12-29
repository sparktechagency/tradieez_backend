/* eslint-disable no-useless-escape */
import z from "zod";
import { VALIDITY_VALUES } from "../constant/subscription.constant";
import { TValidity } from "../interfaces/subscription.interface";
import { VISIBLITY_VALUES } from "../constant/global.constant";
import { TVisibility } from "../types/global.type";


export const createSubscriptionSchema = z.object({
    name: z
        .string({
            invalid_type_error: "name must be string",
            required_error: "name is required",
        })
        .trim()
        .regex(/^[^0-9]*$/, {
            message: "name cannot contain numbers",
        })
        .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
            message: 'name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
        }),
    validity: z
        .string({
            invalid_type_error: "validity must be a valid string value.",
            required_error: "validity is required",
        })
        .refine((val) => VALIDITY_VALUES.includes(val as TValidity), {
            message: `validity must be one of: ${VALIDITY_VALUES.map((cv) => `'${cv}'`).join(",")}`,
        }),
    price: z
        .number({
            required_error: "price value is required",
            invalid_type_error: "price must be a number",
        })
        .refine((val) => !isNaN(val), { message: "price must be a valid number" })
        .refine((val) => val > 0, { message: "price must be greater than 0" }),
    features: z
        .array(
            z.string({
                required_error: "feature is required",
                invalid_type_error: "feature value must be string",
            }), {
            required_error: "features value required",
            invalid_type_error: "features must be an array of strings",
        }
        )
        .min(1, "You must add at least one feature !")
        .superRefine((arr, ctx) => {
            if (arr && arr?.length > 0) {
                const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
                if (duplicates.length > 0) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Features must not contain duplicate values",
                    });
                }
            }
        }),
    description: z
        .string({
            invalid_type_error: "description must be string",
            required_error: "description is required",
        })
        .trim()
});

export const updateSubscriptionSchema = z.object({
    name: z
        .string({
            invalid_type_error: "name must be string",
            required_error: "name is required",
        })
        .trim()
        .regex(/^[^0-9]*$/, {
            message: "name cannot contain numbers",
        })
        .regex(/^[^~!@#$%\^*\+\?><=;:"]*$/, {
            message: 'name cannot contain special characters: ~ ! @ # $ % ^ * + ? > < = ; : "',
        })
        .optional(),
    validity: z
        .string({
            invalid_type_error: "validity must be a valid string value.",
            required_error: "validity is required",
        })
        .refine((val) => VALIDITY_VALUES.includes(val as TValidity), {
            message: `validity must be one of: ${VALIDITY_VALUES.map((cv) => `'${cv}'`).join(",")}`,
        })
        .optional(),
    price: z
        .number({
            required_error: "price value is required",
            invalid_type_error: "price must be a number",
        })
        .refine((val) => !isNaN(val), { message: "price must be a valid number" })
        .refine((val) => val > 0, { message: "price must be greater than 0" })
        .optional(),
    features: z
        .array(
            z.string({
                required_error: "feature is required",
                invalid_type_error: "feature value must be string",
            }), {
            required_error: "features value required",
            invalid_type_error: "features must be an array of strings",
        }
        )
        .min(1, "You must add at least one feature !")
        .superRefine((arr, ctx) => {
            if (arr && arr?.length > 0) {
                const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
                if (duplicates.length > 0) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Features must not contain duplicate values",
                    });
                }
            }
        })
        .optional(),
    description: z
        .string({
            invalid_type_error: "description must be string",
            required_error: "description is required",
        })
        .trim()
        .optional(),
    status: z
        .string({
            invalid_type_error: "status must be a valid string value.",
        })
        .refine((val) => VISIBLITY_VALUES.includes(val as TVisibility), {
            message: `status must be one of: ${VISIBLITY_VALUES.map((cv) => `'${cv}'`).join(",")}`,
        })
        .optional(),
});