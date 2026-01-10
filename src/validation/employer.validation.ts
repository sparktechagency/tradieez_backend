import z from "zod";
import { fullNameRegex } from "./user.validation";

export const registerEmployerValidationSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: "fullName must be string",
      required_error: "fullName is required",
    })
    .trim()
    .regex(fullNameRegex, {
      message:
        "Full Name can only contain letters, spaces, apostrophes, hyphens, and dots.",
    }),
  email: z
    .string({
      invalid_type_error: "email must be string",
      required_error: "email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  phone: z
    .string({
      invalid_type_error: "phone must be string",
      required_error: "phone is required",
    })
    .trim()
    .min(1, "phone is required")
    .regex(/^\+?\d+$/, {
      message: "Phone number can contain only numbers and +",
    }),
  password: z
    .string({
      invalid_type_error: "Password must be string",
      required_error: "Password is required",
    })
    .trim()
    .min(6, "Password minimum 6 characters long")
    .max(60, "Password maximum 60 characters long"),
});

export const updateEmployerSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: "fullName must be string",
      required_error: "fullName is required",
    })
    .trim()
    .regex(fullNameRegex, {
      message:
        "Full Name can only contain letters, spaces, apostrophes, hyphens, and dots.",
    })
    .optional(),
  phone: z
    .string({
      invalid_type_error: "phone must be string",
      required_error: "phone is required",
    })
    .trim()
    .min(1, "phone is required")
    .regex(/^\+?\d+$/, {
      message: "Phone number can contain only numbers and +",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "description must be string",
      required_error: "description is required",
    })
    .trim()
    .optional(),
});
