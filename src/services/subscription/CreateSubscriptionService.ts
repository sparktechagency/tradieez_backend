import { Types } from "mongoose";
import CustomError from "../../errors/CustomError";
import compareDate from "../../utils/compareDate";
import { ISubscription } from "../../interfaces/subscription.interface";
import SubscriptionModel from "../../models/SubscriptionModel";
import PlanModel from "../../models/PlanModel";


const CreateSubscriptionService = async (employerUserId: string, payload: ISubscription) => {
    //check planId
    const plan = await PlanModel.findById(payload.planId);
    if (!plan) {
        throw new CustomError(404, 'Subscription not found with the provided ID');
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
        targetDate.setDate(currentDate.getDate() + Number(30));
    }


    const startDate = currentDate.toISOString()?.split("T")[0];
    const endDate = targetDate.toISOString()?.split("T")[0] + "T23:59:59.999+00:00";
    const result = await SubscriptionModel.create({
        planIdId: payload.planId,
        startDate,
        endDate,
        amount: plan.price,
        userId: employerUserId
    })

    const subscriptions = await SubscriptionModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(employerUserId)
            }
        }
    ])
    //console.log(subscrptions);
    // console.log(currentDate);
    // const inputDate = new Date("2025-12-30");
    // console.log({
    //     inputDate
    // });


    // console.log(subscriptions);

    // const modifiedResult = subscriptions.length > 0 ? subscriptions?.map((cv)=> ({
    //     ...cv,
    //     status: compareDate(cv.endDate)
    // })) : [];

    // return modifiedResult;
}

export default CreateSubscriptionService;