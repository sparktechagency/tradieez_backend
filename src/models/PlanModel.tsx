import { model, Schema } from "mongoose";
import { VISIBLITY_VALUES } from "../constant/global.constant";
import { IPlan } from "../interfaces/plan.interface";
import { DURATION_VALUES, VALIDITY_VALUES } from "../constant/plan.constant";

const planSchema = new Schema<IPlan>({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        enum: DURATION_VALUES,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        trim: true,
    },
    validity: {
        type: String,
        required: true,
        enum: VALIDITY_VALUES
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: VISIBLITY_VALUES,
        default: 'visible'
    }
}, { timestamps: true, versionKey:false });


const PlanModel = model<IPlan>('Plan', planSchema);
export default PlanModel;