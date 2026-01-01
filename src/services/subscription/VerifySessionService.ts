import CustomError from "../../errors/CustomError";
import Stripe from 'stripe';
import config from "../../config";
import SubscriptionModel from "../../models/SubscriptionModel";

const stripe = new Stripe(config.stripe_secret_key as string);

const VerifySessionService = async (sessionId: string) => {
    if (!sessionId) {
        throw new CustomError(400, "sessionId is required");
    }

    const paymentSession = await stripe.checkout.sessions.retrieve(sessionId);

    //payment_status = "no_payment_required", "paid", "unpaid"
    if (paymentSession.payment_status !== "paid") {
        throw new CustomError(403, "Payment Failled");
    }

    const metadata = paymentSession?.metadata;
    if (!metadata || !paymentSession?.payment_intent) {
        throw new CustomError(400, "Invalid Session Id")
    }

    const order = await SubscriptionModel.findOne({
        _id: metadata.subscriptionId,
        userId: metadata.userId,
        paymentStatus: "paid"
    });

    if (order) {
        throw new CustomError(400, "Payment already completed");
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentSession?.payment_intent as string);
    const charge = await stripe.charges.retrieve(
        paymentIntent.latest_charge as string
    );
    const balanceTx = await stripe.balanceTransactions.retrieve(
        charge.balance_transaction as string
    );

    const netAmount = balanceTx?.net / 100
    const stripeFee = balanceTx.fee / 100

    //update payment status
    const result = await SubscriptionModel.updateOne({
        _id: metadata.subscriptionId,
        userId: metadata.userId,
    }, {
        paymentStatus: "paid",
        paymentId: paymentSession?.payment_intent,
        stripeFee,
        netAmount
    })

    return result;
};

export default VerifySessionService;