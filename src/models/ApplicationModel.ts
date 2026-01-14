import { Schema, model } from "mongoose";
import { IApplication } from "../interfaces/application.interface";
import {
  APPLICATION_STATUS_VALUES,
  WORK_STATUS_VALUES,
} from "../constant/application.constant";

const applicationSchema = new Schema<IApplication>(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Job",
    },
    employerUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    candidateUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cv: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: APPLICATION_STATUS_VALUES,
      default: "applied",
    },
    workStatus: {
      type: String,
      enum: WORK_STATUS_VALUES,
      default: "pending",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ApplicationModel = model<IApplication>("Application", applicationSchema);
export default ApplicationModel;
