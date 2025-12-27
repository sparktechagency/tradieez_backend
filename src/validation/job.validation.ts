import z from "zod";
import isNotObjectId from "../utils/isNotObjectId";


export const createJobValidationSchema = z.object({
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
    jobType: z
        .string({
            invalid_type_error: "jobType must be a valid string value.",
            required_error: "jobType value is required"
        })
        .refine((val) => ['full_time', 'part_time', 'freelance', 'contact'].includes(val), {
            message: "jobType must be one of: 'full_time', 'part_time', 'freelance', 'contact'",
        }),
    experience: z
        .string({
            invalid_type_error: "experience must be a valid string value.",
            required_error: "experience value is required"
        })
        .refine((val) => ['apprentice', 'newly_qualified', '1_3_years', '3_5_years', '5_years_plus', 'n/a'].includes(val), {
            message: "experience must be one of: 'apprentice', 'newly_qualified', '1_3_years', '3_5_years', '5_years_plus', 'n/a'",
        }),
    rateType: z
        .string({
            invalid_type_error: "rateType must be a valid string value.",
            required_error: "rateType value is required"
        })
        .refine((val) => ['hourly', 'daily', 'weekly', 'monthly', 'annual'].includes(val), {
            message: "rateType must be one of: 'hourly', 'daily', 'weekly', 'monthly', 'annual'",
        }),
    startDate: z
        .string({
            required_error: "startDate is required",
            invalid_type_error: "startDate must be string value",
        })
        .trim()
        .min(1, { message: "startDate is required" })
        .superRefine((date, ctx) => {
            const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

            // 1️⃣ Validate format first
            if (!formatRegex.test(date)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "startDate must be 'YYYY-MM-DD' format",
                });
                return; // stop further checks
            }

            // 2️⃣ Parse date and check future
            const inputDate = new Date(date + "T00:00:00"); // consistent local date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Start Date must be today or a future date",
                });
            }
        }),
    endDate: z
        .string({
            required_error: "endDate is required",
            invalid_type_error: "endDate must be string value",
        })
        .trim()
        .min(1, { message: "endDate is required" })
        .superRefine((date, ctx) => {
            const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

            // 1️⃣ Validate format first
            if (!formatRegex.test(date)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "endDate must be 'YYYY-MM-DD' format",
                });
                return; // stop further checks
            }

            // 2️⃣ Parse date and check future
            const inputDate = new Date(date + "T00:00:00"); // consistent local date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "End Date must be today or a future date",
                });
            }
        }).optional(),
    deadline: z
        .string({
            required_error: "deadline is required",
            invalid_type_error: "deadline must be string value",
        })
        .trim()
        .min(1, { message: "deadline is required" })
        .superRefine((date, ctx) => {
            const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

            // 1️⃣ Validate format first
            if (!formatRegex.test(date)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "deadline must be 'YYYY-MM-DD' format",
                });
                return; // stop further checks
            }


            // 2️⃣ Parse date and check future
            const inputDate = new Date(date + "T00:00:00"); // consistent local date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "deadline must be today or a future date",
                });
            }
        }),
    skills: z.
        preprocess((val) => {
            if (typeof val === "string") {
                return [val.toString()]
            }
            if (Array.isArray(val)) {
                return val;
            }
            return []
        },
            z.array(
                z.string({
                    required_error: "skill is required",
                    invalid_type_error: "skill must be string",
                }), {
                required_error: "skills must be an array of strings",
                invalid_type_error: "skills must be an array of strings",
            })
                .min(1, "You must add at least one skill !")
                .superRefine((arr, ctx) => {
                    if (arr && arr?.length > 0) {
                        const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
                        if (duplicates.length > 0) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: "Skills must not contain duplicate values",
                            });
                        }
                    }
                })
        ),
    benefits: z
        .string({
            invalid_type_error: "benefits must be string value",
        })
        .trim()
        .optional(),
    minRange: z
        .number({
            required_error: "minRange value is required",
            invalid_type_error: "minRange must be a number",
        })
        .refine((val) => !isNaN(val), { message: "minRange must be a valid number" })
        .refine((val) => val > 0, { message: "minRange must be greater than 0" }),
    maxRange: z
        .number({
            required_error: "maxRange value is required",
            invalid_type_error: "maxRange must be a number",
        })
        .refine((val) => !isNaN(val), { message: "maxRange must be a valid number" })
        .refine((val) => val > 0, { message: "maxRange must be greater than 0" }),
    latitude: z
        .number({
            invalid_type_error: "latitude must be number value",
            required_error: "latitude value is required"
        })
        .finite()
        .min(-90, { message: "latitude must be >= -90" })
        .max(90, { message: "latitude must be <= 90" }),
    longitude: z
        .number({
            invalid_type_error: "longitude must be number value",
            required_error: "longitude value is required"
        })
        .finite()
        .min(-180, { message: "longitude must be >= -180" })
        .max(180, { message: "longitude must be <= 180" }),
    address: z
        .string({
            invalid_type_error: "address must be string",
            required_error: "address is required",
        })
        .min(1, "address is required")
        .trim(),
    postalCode: z
        .string({
            invalid_type_error: "postalCode must be string",
            required_error: "postalCode is required",
        })
        .min(1, "postalCode is required")
        .trim(),
    description: z
        .string({
            invalid_type_error: "description must be string",
            required_error: "description is required",
        })
        .min(1, "description is required")
        .trim()
})
    .superRefine((values, ctx) => {
        const { startDate, endDate, minRange, maxRange } = values;
        if (startDate && endDate) {
            // Compare dates only if both are valid
            const StartDate = new Date(startDate);
            const EndDate = new Date(endDate);

            if (StartDate > EndDate) {
                ctx.addIssue({
                    path: ["startDate"],
                    message: "Start date must be before end date",
                    code: z.ZodIssueCode.custom,
                });

                ctx.addIssue({
                    path: ["endDate"],
                    message: "End date must be after start date",
                    code: z.ZodIssueCode.custom,
                });
                return;
            }
        }

        if (minRange && maxRange) {
            if (minRange >= maxRange) {
                ctx.addIssue({
                    path: ["minRange"],
                    message: "Minimum range must be less than minimum range",
                    code: z.ZodIssueCode.custom,
                });

                ctx.addIssue({
                    path: ["maxRange"],
                    message: "Maximum range must be greater than minimum range",
                    code: z.ZodIssueCode.custom,
                });
            }
        }
    });



    
export const updateJobValidationSchema = z.object({
    title: z
        .string({
            invalid_type_error: "title must be string",
            required_error: "title is required",
        })
        .min(1, "title is required")
        .trim()
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
    jobType: z
        .string({
            invalid_type_error: "jobType must be a valid string value.",
            required_error: "jobType value is required"
        })
        .refine((val) => ['full_time', 'part_time', 'freelance', 'contact'].includes(val), {
            message: "jobType must be one of: 'full_time', 'part_time', 'freelance', 'contact'",
        })
        .optional(),
    experience: z
        .string({
            invalid_type_error: "experience must be a valid string value.",
            required_error: "experience value is required"
        })
        .refine((val) => ['apprentice', 'newly_qualified', '1_3_years', '3_5_years', '5_years_plus', 'n/a'].includes(val), {
            message: "experience must be one of: 'apprentice', 'newly_qualified', '1_3_years', '3_5_years', '5_years_plus', 'n/a'",
        })
        .optional(),
    rateType: z
        .string({
            invalid_type_error: "rateType must be a valid string value.",
            required_error: "rateType value is required"
        })
        .refine((val) => ['hourly', 'daily', 'weekly', 'monthly', 'annual'].includes(val), {
            message: "rateType must be one of: 'hourly', 'daily', 'weekly', 'monthly', 'annual'",
        })
        .optional(),
    startDate: z
        .string({
            required_error: "startDate is required",
            invalid_type_error: "startDate must be string value",
        })
        .trim()
        .min(1, { message: "startDate is required" })
        .superRefine((date, ctx) => {
            const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

            // 1️⃣ Validate format first
            if (!formatRegex.test(date)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "startDate must be 'YYYY-MM-DD' format",
                });
                return; // stop further checks
            }

            // 2️⃣ Parse date and check future
            const inputDate = new Date(date + "T00:00:00"); // consistent local date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "startDate must be today or a future date",
                });
            }
        })
        .optional(),
    endDate: z
        .string({
            required_error: "endDate is required",
            invalid_type_error: "endDate must be string value",
        })
        .trim()
        .min(1, { message: "endDate is required" })
        .superRefine((date, ctx) => {
            const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

            // 1️⃣ Validate format first
            if (!formatRegex.test(date)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "endDate must be 'YYYY-MM-DD' format",
                });
                return; // stop further checks
            }

            // 2️⃣ Parse date and check future
            const inputDate = new Date(date + "T00:00:00"); // consistent local date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "startDate must be today or a future date",
                });
            }
        }).optional(),
    deadline: z
        .string({
            required_error: "deadline is required",
            invalid_type_error: "deadline must be string value",
        })
        .trim()
        .min(1, { message: "deadline is required" })
        .superRefine((date, ctx) => {
            const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

            // 1️⃣ Validate format first
            if (!formatRegex.test(date)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "deadline must be 'YYYY-MM-DD' format",
                });
                return; // stop further checks
            }


            // 2️⃣ Parse date and check future
            const inputDate = new Date(date + "T00:00:00"); // consistent local date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "deadline must be today or a future date",
                });
            }
        }).optional(),
    skills: z.
        preprocess((val) => {
            if (typeof val === "string") {
                return [val.toString()]
            }
            if (Array.isArray(val)) {
                return val;
            }
            return []
        },
            z.array(
                z.string({
                    required_error: "skill is required",
                    invalid_type_error: "skill must be string",
                }), {
                required_error: "skills must be an array of strings",
                invalid_type_error: "skills must be an array of strings",
            })
                .min(1, "You must add at least one skill !")
                .superRefine((arr, ctx) => {
                    if (arr && arr?.length > 0) {
                        const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
                        if (duplicates.length > 0) {
                            ctx.addIssue({
                                code: z.ZodIssueCode.custom,
                                message: "Skills must not contain duplicate values",
                            });
                        }
                    }
                })
        ).optional(),
    benefits: z
        .string({
            invalid_type_error: "benefits must be string value",
        })
        .trim()
        .optional(),
    minRange: z
        .number({
            required_error: "minRange value is required",
            invalid_type_error: "minRange must be a number",
        })
        .refine((val) => !isNaN(val), { message: "minRange must be a valid number" })
        .refine((val) => val > 0, { message: "minRange must be greater than 0" })
        .optional(),
    maxRange: z
        .number({
            required_error: "maxRange value is required",
            invalid_type_error: "maxRange must be a number",
        })
        .refine((val) => !isNaN(val), { message: "maxRange must be a valid number" })
        .refine((val) => val > 0, { message: "maxRange must be greater than 0" })
        .optional(),
    latitude: z
        .number({
            invalid_type_error: "latitude must be number value",
            required_error: "latitude value is required"
        })
        .finite()
        .min(-90, { message: "latitude must be >= -90" })
        .max(90, { message: "latitude must be <= 90" })
        .optional(),
    longitude: z
        .number({
            invalid_type_error: "longitude must be number value",
            required_error: "longitude value is required"
        })
        .finite()
        .min(-180, { message: "longitude must be >= -180" })
        .max(180, { message: "longitude must be <= 180" })
        .optional(),
    address: z
        .string({
            invalid_type_error: "address must be string",
            required_error: "address is required",
        })
        .min(1, "address is required")
        .trim()
        .optional(),
    postalCode: z
        .string({
            invalid_type_error: "postalCode must be string",
            required_error: "postalCode is required",
        })
        .min(1, "postalCode is required")
        .trim()
        .optional(),
    description: z
        .string({
            invalid_type_error: "description must be string",
            required_error: "description is required",
        })
        .min(1, "description is required")
        .trim()
        .optional(),
    status: z
        .string({
            invalid_type_error: "status must be a valid string value.",
        })
        .refine((val) => ['visible', 'hidden'].includes(val), {
            message: "status must be one of: 'visible', 'hidden'",
        })
        .optional(),
})
    .superRefine((values, ctx) => {
        const { startDate, endDate, minRange, maxRange, longitude, latitude, address, postalCode } = values;
        if (startDate && endDate) {
            // Compare dates only if both are valid
            const StartDate = new Date(startDate);
            const EndDate = new Date(endDate);

            if (StartDate > EndDate) {
                ctx.addIssue({
                    path: ["startDate"],
                    message: "Start date must be before end date",
                    code: z.ZodIssueCode.custom,
                });

                ctx.addIssue({
                    path: ["endDate"],
                    message: "End date must be after start date",
                    code: z.ZodIssueCode.custom,
                });
                return;
            }
        }

        if (minRange && maxRange) {
            if (minRange >= maxRange) {
                ctx.addIssue({
                    path: ["minRange"],
                    message: "Minimum range must be less than maximum range",
                    code: z.ZodIssueCode.custom,
                });

                ctx.addIssue({
                    path: ["maxRange"],
                    message: "Maximum range must be greater than minimum range",
                    code: z.ZodIssueCode.custom,
                });
            }
        }

        if (longitude && !latitude) {
            ctx.addIssue({
                path: ["latitude"],
                message: "latitude value must be required",
                code: z.ZodIssueCode.custom,
            });
        }
        if (!longitude && latitude) {
            ctx.addIssue({
                path: ["longitude"],
                message: "longitude value must be required",
                code: z.ZodIssueCode.custom,
            });
        }
        if (longitude && latitude && !address) {
            if (!address) {
                ctx.addIssue({
                    path: ["address"],
                    message: "address is required",
                    code: z.ZodIssueCode.custom,
                });
            }
        }
        if (longitude && latitude && !postalCode) {
            if (!address) {
                ctx.addIssue({
                    path: ["address"],
                    message: "postalCode is required",
                    code: z.ZodIssueCode.custom,
                });
            }
        }
    });


export const updateJobStatusSchema = z.object({
    status: z
        .string({
            invalid_type_error: "status must be a valid string value.",
            required_error: 'status value is required'
        })
        .min(1, 'status value is required')
        .refine((val) => ['visible', 'hidden'].includes(val), {
            message: "status must be one of: 'visible', 'hidden'",
        })
})