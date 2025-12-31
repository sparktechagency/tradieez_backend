import { model, Schema } from "mongoose";
import { ISubscription } from "../interfaces/subscription.interface";
import { PAYMENT_STATUS_VALUES } from "../constant/subscription.constant";


const subscriptionSchema = new Schema<ISubscription>({
    planId: {
        type: Schema.Types.ObjectId,
        required: [true, "planId is required"],
        trim: true,
        ref: "Plan"
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "userId is required"],
        trim: true,
        ref: "User"
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: PAYMENT_STATUS_VALUES,
        default: 'unpaid'
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        default: null
    },
}, {
    timestamps: true,
    versionKey: false
})



const SubscriptionModel = model<ISubscription>("Subscription", subscriptionSchema);
export default SubscriptionModel;