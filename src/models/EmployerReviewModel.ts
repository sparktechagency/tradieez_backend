import { model, Schema } from "mongoose";
import { IEmployerReview } from "../interfaces/employerReview.interface";

const employerReviewSchema = new Schema<IEmployerReview>({
    jobId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Job"
    },
    candidateUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    employerUserId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    star: {
        type: Number,
        required: true,
        trim: true,
        min: [0.5, "Rating must be at least 0.5"],
        max: [5, "Rating must not exceed 5"],
        validate: {
            validator: (value: number) => value % 0.5 === 0,
            message: "Rating must be in increments of 0.5",
        },
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    isHidden: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
}
);


const EmployerReviewModel = model<IEmployerReview>("EmployerReview", employerReviewSchema);
export default EmployerReviewModel;