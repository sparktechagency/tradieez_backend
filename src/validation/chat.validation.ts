import z from "zod";
import isNotObjectId from "../utils/isNotObjectId";

export const createChatSchema = z.object({
    partnerId: z
        .string({
            invalid_type_error: "partnerId must be a string",
            required_error: "partnerId is required!",
        })
        .refine((id) => !isNotObjectId(id), {
            message: "partnerId must be a valid ObjectId",
        }),
    text: z
        .string({
            invalid_type_error: "text must be string",
            required_error: "text is required",
        })
        .min(1, "text is required")
        .trim()
});