import CustomError from "../../errors/CustomError";
import { ISubscription } from "../../interfaces/subscription.interface";
import SubscriptionModel from "../../models/SubscriptionModel";
import convertToSlug from "../../utils/convertToSlug";
import isNotObjectId from "../../utils/isNotObjectId";

const UpdateSubscriptionService = async (subscriptionId: string, payload: Partial<ISubscription>) => {
    const { name, validity } = payload;
    if (isNotObjectId(subscriptionId)) {
        throw new CustomError(400, "subscriptionId must be a valid ObjectId")
    }

    const subscription = await SubscriptionModel.findById(subscriptionId);
    if (!subscription) {
        throw new CustomError(404, 'Subscription not found with the provided ID');
    }


    //if name is available but validity is not available
    if (name && !validity) {
        const slug = convertToSlug(name);
        payload.slug = slug;
        const subscriptionExist = await SubscriptionModel.findOne({
            _id: { $ne: subscriptionId },
            slug,
            validity: subscription.validity
        });
        if (subscriptionExist) {
            throw new CustomError(409, 'Sorry, This subscription already exists.');
        }
    }

     //if name is unavailable but validity is available
    if (!name && validity) {
        const subscriptionExist = await SubscriptionModel.findOne({
            _id: { $ne: subscriptionId },
            slug: subscription.slug,
            validity
        });
        if (subscriptionExist) {
            throw new CustomError(409, 'Sorry, This subscription already exists.');
        }
        if (validity === 'monthly') {
            payload.duration = 30;
        }
        if (validity === 'yearly') {
            payload.duration = 365;
        }
    }


    //if name & validity are available
    if (name && validity) {
        const slug = convertToSlug(name);
        payload.slug = slug;
        const subscriptionExist = await SubscriptionModel.findOne({
            _id: { $ne: subscriptionId },
            slug,
            validity
        });
        if (subscriptionExist) {
            throw new CustomError(409, 'Sorry, This subscription already exists.');
        }
        if (validity === 'monthly') {
            payload.duration = 30;
        }
        if (validity === 'yearly') {
            payload.duration = 365;
        }
    }

    const result = await SubscriptionModel.updateOne(
        { _id: subscriptionId },
        payload,
        { runValidators: true}
    )

    return result;
}

export default UpdateSubscriptionService;