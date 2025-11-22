import { z } from "zod";
import { Types } from "mongoose";

export const addRemoveFavouriteCandidateSchema = z.object({
  candidateUserId: z
    .string({
      required_error: "candidateUserId is required!",
    })
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "candidateUserId must be a valid ObjectId",
    }),
});
