import CustomError from "../../errors/CustomError";
import { ISubscription } from "../../interfaces/subscription.interface";
import SubscriptionModel from "../../models/SubscriptionModel";
import convertToSlug from "../../utils/convertToSlug";

const CreateSubscriptionService = async (payload: ISubscription) => {
    const { name, validity } = payload;
    const slug = convertToSlug(name);
    payload.slug=slug

    //check subscription is already existed
    const subscription = await SubscriptionModel.findOne({
        slug,
        validity
    });

    if (subscription) {
        throw new CustomError(409, 'This subscription plan already exists.');
    }

    if(validity==='monthly'){
        payload.duration=30;
    }
    if(validity==='yearly'){
        payload.duration=365;
    }

    const result = await SubscriptionModel.create(payload);
    return result;
    
}

export default CreateSubscriptionService;