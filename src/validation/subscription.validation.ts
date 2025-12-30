import z from "zod";
import isNotObjectId from "../utils/isNotObjectId";

export const createSubscriptionSchema = z.object({
    planId: z
        .string({
            invalid_type_error: "planId must be a string",
            required_error: "planId is required!",
        })
        .refine((id) => !isNotObjectId(id), {
            message: "planId must be a valid ObjectId",
        })
});
