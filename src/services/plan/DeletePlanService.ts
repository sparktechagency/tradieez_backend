import CustomError from "../../errors/CustomError";
import PlanModel from "../../models/PlanModel";
import SubscriptionModel from "../../models/SubscriptionModel";
import isNotObjectId from "../../utils/isNotObjectId";


const DeletePlanService = async (planId: string) => {
    if (isNotObjectId(planId)) {
        throw new CustomError(400, "planId must be a valid ObjectId")
    }
    const plan = await PlanModel.findById(planId)
    if(!plan){
        throw new CustomError(404, 'Plan not found with the provided ID');
    }

    //check if planId is associated with subscription
    const associatedWitSubscription= await SubscriptionModel.findOne({
        planId
    });
    if (associatedWitSubscription) {
        throw new CustomError(409, 'Unable to delete, This Plan is associated with one or more subscriptions');
    }

    const result = await PlanModel.deleteOne({ _id: planId})
    return result;
}

export default DeletePlanService;