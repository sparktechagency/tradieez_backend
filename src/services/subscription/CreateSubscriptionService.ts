import CustomError from "../../errors/CustomError";
import { ISubscription } from "../../interfaces/subscription.interface";
import SubscriptionModel from "../../models/SubscriptionModel";
import PlanModel from "../../models/PlanModel";


const CreateSubscriptionService = async (employerUserId: string, payload: ISubscription) => {
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

    const result = await SubscriptionModel.create({
        planId: payload.planId,
        startDate,
        endDate,
        amount: plan.price,
        userId: employerUserId
    })

    return result;
}

export default CreateSubscriptionService;