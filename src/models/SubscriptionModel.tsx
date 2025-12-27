import { model, Schema } from "mongoose";
import { ISubscription } from "../interfaces/subscription.interface";
import { DURATION_VALUES, VALIDITY_VALUES } from "../constant/subscription.constant";
import { VISIBLITY_VALUES } from "../constant/global.constant";

const subscriptionSchema = new Schema<ISubscription>({
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


const SubscriptionModel = model<ISubscription>('Subscription', subscriptionSchema);
export default SubscriptionModel;