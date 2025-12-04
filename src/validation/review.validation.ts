import { Types } from "mongoose";
import { z } from "zod";

export const employerReviewSchema = z.object({
  jobId: z
    .string({
      required_error: "jobId is required!",
    })
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "jobId must be a valid ObjectId",
    }),
  candidateUserId: z
    .string({
      required_error: "candidateUserId is required!",
    })
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "candidateUserId must be a valid ObjectId",
    }),
  star: z
    .number({
      required_error: "star rating is required",
      invalid_type_error: "star rating value must be number",
    })
    .min(0.5, { message: "Rating value must be at least 0.5" }) // Minimum rating is 0.5
    .max(5, { message: "Rating value must not exceed 5" }) // Maximum rating is 5
    .refine((val) => val % 0.5 === 0, {
      message: "Rating must be in increments of 0.5",
    }),
  comment: z.
    string({
      required_error: "Comment is required",
      invalid_type_error: "comment value must be string"
    })
    .max(500, "Comment value cannot exceed 500 characters")
});
