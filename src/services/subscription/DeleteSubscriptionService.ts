import CustomError from "../../errors/CustomError";
import SubscriptionModel from "../../models/SubscriptionModel";
import isNotObjectId from "../../utils/isNotObjectId";


const DeleteSubscriptionService = async (subscriptionId: string) => {
    if (isNotObjectId(subscriptionId)) {
        throw new CustomError(400, "subscriptionId must be a valid ObjectId")
    }
    const subscription = await SubscriptionModel.findById(subscriptionId)
    if(!subscription){
        throw new CustomError(404, 'Subscription not found with the provided ID');
    }

    const result = await SubscriptionModel.deleteOne({ _id: subscriptionId})
    return result;
}

export default DeleteSubscriptionService;