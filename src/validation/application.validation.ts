import { z } from "zod";
import { Types } from "mongoose";
import {
  APPLICATION_STATUS_VALUES,
  WORK_STATUS_VALUES,
} from "../constant/application.constant";
import {
  TApplicationStatus,
  TWorkStatus,
} from "../interfaces/application.interface";

export const applyJobSchema = z.object({
  jobId: z
    .string({
      required_error: "jobId is required!",
    })
    .refine((id) => Types.ObjectId.isValid(id), {
      message: "jobId must be a valid ObjectId",
    }),
});

export const updateApplicationSchema = z
  .object({
    status: z
      .string({
        invalid_type_error: "status must be a valid string value.",
      })
      .refine(
        (val) => APPLICATION_STATUS_VALUES.includes(val as TApplicationStatus),
        {
          message: `status must be one of: ${APPLICATION_STATUS_VALUES.map((cv) => `'${cv}'`).join(",")}`,
        },
      )
      .optional(),
    workStatus: z
      .string({
        invalid_type_error: "workStatus must be a valid string value.",
      })
      .refine((val) => WORK_STATUS_VALUES.includes(val as TWorkStatus), {
        message: `workStatus must be one of: ${WORK_STATUS_VALUES.map((cv) => `'${cv}'`).join(",")}`,
      })
      .optional(),
  })
  .superRefine((values, ctx) => {
    const { status, workStatus } = values;
    if (status && workStatus) {
      ctx.addIssue({
        path: ["status"],
        message: "Status and work status cannot be updated at the same time.",
        code: z.ZodIssueCode.custom,
      });
    }
  });
