import { model, Schema } from "mongoose";
import { IJob } from "../interfaces/job.interface";
import { JOB_EXPERIENCE_VALUES, JOB_RATE_VALUES, JOB_TYPE_VALUES } from "../constant/job.constant";


const jobSchema = new Schema<IJob>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "userId is required"],
        ref: "User"
    },
    title: {
        type: String,
        required: [true, 'title is required'],
        trim: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: [true, "categoryId is required"],
        trim: true,
        ref: "Category"
    },
    jobType: {
        type: String,
        required: true,
        enum: JOB_TYPE_VALUES,
    },
    experience: {
        type: String,
        required: true,
        enum: JOB_EXPERIENCE_VALUES,
    },
    rateType: {
        type: String,
        required: true,
        enum: JOB_RATE_VALUES,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null
    },
    deadline: {
        type: Date,
        required: true
    },
    skills: {
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: "At least one skill is required"
        }
    },
    benefits: {
        type: String,
        default: ""
    },
    minRange: {
        type: Number,
        required: true,
        min: [1, "minimum range 1"]
    },
    maxRange: {
        type: Number,
        required: true,
        min: [1, "maximum range minimum 1"]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'type' must be "Point"
            required: true,
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true,
        },
    },
    address: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['visible', 'hidden'],
        default: "visible"
    },
}, {
    versionKey: false,
    timestamps: true
})


const JobModel = model<IJob>('Job', jobSchema);
export default JobModel;