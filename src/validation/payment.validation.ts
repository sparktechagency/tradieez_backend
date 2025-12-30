import z from "zod";
import isNotObjectId from "../utils/isNotObjectId";

export const initiatePaymentSchema = z.object({
    subscriptionId: z
        .string({
            invalid_type_error: "subscriptionId must be a string",
            required_error: "subscriptionId is required!",
        })
        .refine((id) => !isNotObjectId(id), {
            message: "subscriptionId must be a valid ObjectId",
        })
});
