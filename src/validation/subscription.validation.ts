import z from "zod";
import isNotObjectId from "../utils/isNotObjectId";

export const createSubscriptionSchema = z.object({
    planIdId: z
        .string({
            invalid_type_error: "planIdId must be a string",
            required_error: "planIdId is required!",
        })
        .refine((id) => !isNotObjectId(id), {
            message: "planIdId must be a valid ObjectId",
        })
});
