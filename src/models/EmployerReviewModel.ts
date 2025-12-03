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
    }
}, {
    timestamps: true,
    versionKey: false
}
);


const EmployerReviewModel = model<IEmployerReview>("EmployerReview", employerReviewSchema);
export default EmployerReviewModel;