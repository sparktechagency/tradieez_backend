/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errors/CustomError";
import { ISubscription } from "../../interfaces/subscription.interface";
import SubscriptionModel from "../../models/SubscriptionModel";
import PlanModel from "../../models/PlanModel";
import mongoose from "mongoose";
import Stripe from 'stripe';
import config from "../../config";
import generateTransactionId from "../../utils/generateTransactionId";

const stripe = new Stripe(config.stripe_secret_key as string);


const CreateSubscriptionService = async (employerUserId: string, employerEmail: string, payload: ISubscription) => {
    //check planId
    const plan = await PlanModel.findById(payload.planId);
    if (!plan) {
        throw new CustomError(404, 'Subscription plan not found with the provided ID');
    }

    //check status
    if (plan.status === "hidden") {
        throw new CustomError(400, 'This plan is hidden');
    }

    //Calculate the date of after 30 days
    const currentDate = new Date();
    const targetDate = new Date();

    if (plan.duration === 30) {
        targetDate.setDate(currentDate.getDate() + Number(30));
    }
    if (plan.duration === 365) {
        targetDate.setDate(currentDate.getDate() + Number(365));
    }

    const startDate = currentDate.toISOString()?.split("T")[0];
    const endDate = targetDate.toISOString()?.split("T")[0] + "T23:59:59.999+00:00";

    const lineItems = [{
        price_data: {
            currency: "gbp",
            product_data: {
                name: `${plan.name} Subscription (${plan.validity === 'monthly' ? "Monthly" : "Yearly"})`,
            },
            unit_amount: Math.round(Number(plan.price) * 100), // in cents
        },
        quantity: 1,
    }]


    //generate transactionId
    const transactionId = generateTransactionId();

    //transaction & rollback
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const subscription = await SubscriptionModel.create([
            {
                userId: employerUserId,
                planId: payload.planId,
                startDate,
                endDate,
                amount: plan.price,
                transactionId
            }
        ], { session });


        //create payment session
        const paymentSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            metadata: {
                userId: employerUserId,
                subscriptionId: subscription[0]?._id.toString() as string
            },
            customer_email: employerEmail,
            client_reference_id: subscription[0]?._id.toString() as string,
            success_url: `${config.frontend_url}/payment/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.frontend_url}/payment/cancel`,
        });

        //transaction success
        await session.commitTransaction();
        await session.endSession();
        return {
            url: paymentSession.url
        };
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}

export default CreateSubscriptionService;