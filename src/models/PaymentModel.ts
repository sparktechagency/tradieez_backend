import { model, Schema } from "mongoose";
import { IPayment } from "../interfaces/payment.interface";
import { PAYMENT_STATUS_VALUES } from "../constant/payment.constant";


const paymentSchema = new Schema<IPayment>({
    subscriptionId: {
        type: Schema.Types.ObjectId,
        required: [true, "subscriptionId is required"],
        trim: true,
        ref: "Subscription"
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
        default: 'pending'
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



const PaymentModel = model<IPayment>("Payment", paymentSchema);
export default PaymentModel;