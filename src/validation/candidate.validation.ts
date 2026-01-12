import z from "zod";
import { fullNameRegex } from "./user.validation";
import isNotObjectId from "../utils/isNotObjectId";

export const registerCandidateValidationSchema = z.object({
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
  title: z
    .string({
      invalid_type_error: "title must be string",
      required_error: "title is required",
    })
    .trim()
    .min(1, "title is required"),
  jobSeekingTitle: z
    .array(
      z.string({
        required_error: "Job seeking title is required",
        invalid_type_error: "Job seeking title must be string",
      }),
      {
        required_error: "jobSeeking Title must be an array of strings",
        invalid_type_error: "jobSeekingTitle must be an array of strings",
      }
    )
    .min(1, "You must add at least one jobSeekingTitle !")
    .superRefine((arr, ctx) => {
      if (arr && arr?.length > 0) {
        const duplicates = arr.filter(
          (item, index) => arr.indexOf(item) !== index
        );
        if (duplicates.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Job Seeking Title must not contain duplicate values",
          });
        }
      }
    }),
  subCategoryId: z
    .string({
      invalid_type_error: "subCategoryId must be a string",
      required_error: "subCategoryId is required!",
    })
    .refine((id) => !isNotObjectId(id), {
      message: "subCategoryId must be a valid ObjectId",
    }),
  workRate: z
    .string({
      invalid_type_error: "workRate must be a valid string value.",
      required_error: "workRate value is required",
    })
    .trim()
    .min(1, "workRate value is required")
    .refine((val) => ["per_hour", "per_day", "per_job"].includes(val), {
      message: "workRate must be one of: 'per_hour', 'per_day' 'per_job'",
    }),
  workType: z
    .string({
      invalid_type_error: "workType must be a valid string value.",
      required_error: "workType value is required",
    })
    .trim()
    .min(1, "workType value is required")
    .refine(
      (val) =>
        ["full_time", "part_time", "gig", "evenings_weekends"].includes(val),
      {
        message:
          "workType must be one of: 'full_time', 'part_time', 'gig', 'evenings_weekends'",
      }
    ),
  availableDate: z
    .string({
      required_error: "availableDate is required",
      invalid_type_error: "availableDate must be string value",
    })
    .trim()
    .min(1, { message: "availableDate is required" })
    .superRefine((date, ctx) => {
      const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

      // 1️⃣ Validate format first
      if (!formatRegex.test(date)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid Date format, expected 'YYYY-MM-DD'",
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
          message: "Available date must be today or a future date",
        });
      }
    }),
  employmentType: z
    .string({
      invalid_type_error: "employmentType must be a valid string value.",
      required_error: "employmentType value is required",
    })
    .refine(
      (val) => ["self_employed", "seeking_employed", "both"].includes(val),
      {
        message:
          "employmentType must be one of: 'self_employed', 'seeking_employed', 'both'",
      }
    ),
  latitude: z
    .number({
      invalid_type_error: "latitude must be number value",
      required_error: "latitude value is required",
    })
    .finite()
    .min(-90, { message: "latitude must be >= -90" })
    .max(90, { message: "latitude must be <= 90" }),
  longitude: z
    .number({
      invalid_type_error: "longitude must be number value",
      required_error: "longitude value is required",
    })
    .finite()
    .min(-180, { message: "longitude must be >= -180" })
    .max(180, { message: "longitude must be <= 180" }),
  address: z
    .string({
      invalid_type_error: "Address must be string",
      required_error: "address is required",
    })
    .trim(),
  postalCode: z
    .string({
      invalid_type_error: "postalCode must be string",
      required_error: "postalCode is required",
    })
    .trim()
    .min(1, "postalCode is required"),
  city: z
    .string({
      invalid_type_error: "city must be string",
      required_error: "city is required",
    })
    .trim()
    .min(1, "city is required"),
  skills: z
    .array(
      z.string({
        required_error: "skill is required",
        invalid_type_error: "skill must be string",
      }),
      {
        required_error: "skills must be an array of strings",
        invalid_type_error: "skills must be an array of strings",
      }
    )
    .min(1, "You must add at least one skill !")
    .superRefine((arr, ctx) => {
      if (arr && arr?.length > 0) {
        const duplicates = arr.filter(
          (item, index) => arr.indexOf(item) !== index
        );
        if (duplicates.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Skills must not contain duplicate values",
          });
        }
      }
    }),
  experience: z
    .string({
      invalid_type_error: "experience must be a valid string value.",
      required_error: "experience value is required",
    })
    .refine((val) => ["entry", "mid", "senior", "expert"].includes(val), {
      message: "experience must be one of: 'entry', 'mid', 'senior', 'expert'",
    }),
});

export const updateCandidateSchema = z
  .object({
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
    title: z
      .string({
        invalid_type_error: "title must be string",
        required_error: "title is required",
      })
      .trim()
      .min(1, "title is required")
      .optional(),
    jobSeekingTitle: z
      .preprocess(
        (val) => {
          if (typeof val === "string") {
            return [val.toString()];
          }
          if (Array.isArray(val)) {
            return val;
          }
          return [];
        },
        z
          .array(
            z.string({
              required_error: "Job seeking title is required",
              invalid_type_error: "jobSeekingTitle must be string",
            }),
            {
              required_error: "jobSeekingTitle must be an array of strings",
              invalid_type_error: "jobSeekingTitle must be an array of strings",
            }
          )
          .min(1, "You must add at least one jobSeekingTitle !")
          .superRefine((arr, ctx) => {
            if (arr && arr?.length > 0) {
              const duplicates = arr.filter(
                (item, index) => arr.indexOf(item) !== index
              );
              if (duplicates.length > 0) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "Job seeking title must not contain duplicate values",
                });
              }
            }
          })
      )
      .optional(),
    subCategoryId: z
      .string({
        invalid_type_error: "subCategoryId must be a string",
        required_error: "subCategoryId is required!",
      })
      .refine((id) => !isNotObjectId(id), {
        message: "subCategoryId must be a valid ObjectId",
      })
      .optional(),
    workRate: z
      .string({
        invalid_type_error: "workRate must be a valid string value.",
        required_error: "workRate value is required",
      })
      .trim()
      .min(1, "workRate value is required")
      .refine((val) => ["per_hour", "per_day", "per_job"].includes(val), {
        message: "workRate must be one of: 'per_hour', 'per_day' 'per_job'",
      })
      .optional(),
    workType: z
      .string({
        invalid_type_error: "workType must be a valid string value.",
        required_error: "workType value is required",
      })
      .trim()
      .min(1, "workType value is required")
      .refine(
        (val) =>
          ["full_time", "part_time", "gig", "evenings_weekends"].includes(val),
        {
          message:
            "workType must be one of: 'full_time', 'part_time', 'gig', 'evenings_weekends'",
        }
      )
      .optional(),
    availableDate: z
      .string({
        required_error: "availableDate is required",
        invalid_type_error: "availableDate must be string value",
      })
      .trim()
      .min(1, { message: "availableDate is required" })
      .superRefine((date, ctx) => {
        const formatRegex = /^20\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

        // 1️⃣ Validate format first
        if (!formatRegex.test(date)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid Date format, expected 'YYYY-MM-DD'",
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
            message: "Available date must be today or a future date",
          });
        }
      })
      .optional(),
    employmentType: z
      .string({
        invalid_type_error: "employmentType must be a valid string value.",
        required_error: "employmentType value is required",
      })
      .refine(
        (val) => ["self_employed", "seeking_employed", "both"].includes(val),
        {
          message:
            "employmentType must be one of: 'self_employed', 'seeking_employed', 'both'",
        }
      )
      .optional(),
    latitude: z
      .preprocess(
        (val) =>
          val === "" || val === undefined || val === null
            ? undefined
            : Number(val),
        z
          .number({
            invalid_type_error: "latitude must be number value",
            required_error: "latitude value is required",
          })
          .finite()
          .min(-90, { message: "latitude must be >= -90" })
          .max(90, { message: "latitude must be <= 90" })
      )
      .optional(),
    longitude: z
      .preprocess(
        (val) =>
          val === "" || val === undefined || val === null
            ? undefined
            : Number(val),
        z
          .number({
            invalid_type_error: "longitude must be number value",
            required_error: "longitude value is required",
          })
          .finite()
          .min(-180, { message: "longitude must be >= -180" })
          .max(180, { message: "longitude must be <= 180" })
      )
      .optional(),
    address: z
      .string({
        invalid_type_error: "Address must be string",
        required_error: "address is required",
      })
      .trim()
      .optional(),
    postalCode: z
      .string({
        invalid_type_error: "postalCode must be string",
        required_error: "postalCode is required",
      })
      .trim()
      .optional(),
    city: z
      .string({
        invalid_type_error: "city must be string",
        required_error: "city is required",
      })
      .trim()
      .optional(),
    skills: z
      .preprocess(
        (val) => {
          if (typeof val === "string") {
            return [val.toString()];
          }
          if (Array.isArray(val)) {
            return val;
          }
          return [];
        },
        z
          .array(
            z.string({
              required_error: "skill is required",
              invalid_type_error: "skill must be string",
            }),
            {
              required_error: "skills must be an array of strings",
              invalid_type_error: "skills must be an array of strings",
            }
          )
          .min(1, "You must add at least one skill !")
          .superRefine((arr, ctx) => {
            if (arr && arr?.length > 0) {
              const duplicates = arr.filter(
                (item, index) => arr.indexOf(item) !== index
              );
              if (duplicates.length > 0) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "Skills must not contain duplicate values",
                });
              }
            }
          })
      )
      .optional(),
    experience: z
      .string({
        invalid_type_error: "experience must be a valid string value.",
        required_error: "experience value is required",
      })
      .refine((val) => ["entry", "mid", "senior", "expert"].includes(val), {
        message:
          "experience must be one of: 'entry', 'mid', 'senior', 'expert'",
      })
      .optional(),
    isPrivate: z
      .preprocess(
        (val) => {
          if (val === "true" || val === true) return true;
          if (val === "false" || val === false) return false;
          return val; // fallback for invalid types
        },
        z.boolean({
          invalid_type_error: "isPrivate must be boolean value",
        })
      )
      .optional(),
    description: z
      .string({
        invalid_type_error: "description must be string",
        required_error: "description is required",
      })
      .trim()
      .optional(),
  })
  .superRefine((values, ctx) => {
    const { longitude, latitude, address } = values;
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
  });
