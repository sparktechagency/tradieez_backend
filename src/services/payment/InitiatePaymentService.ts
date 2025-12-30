import { Types } from "mongoose";
import CustomError from "../../errors/CustomError";
import { IPayment } from "../../interfaces/payment.interface";
import PaymentModel from "../../models/PaymentModel";
import SubscriptionModel from "../../models/PlanModel";
import compareDate from "../../utils/compareDate";


const InitiatePaymentService = async (employerUserId: string, payload: IPayment) => {
    //check subscription
    const subscription = await SubscriptionModel.findById(payload.subscriptionId);
    if (!subscription) {
        throw new CustomError(404, 'Subscription not found with the provided ID');
    }

    //check status
    if (subscription.status === "hidden") {
        throw new CustomError(400, 'This subscription is hidden');
    }


    const currentDate = new Date();
    // Calculate the date of after 30 days
    // const targetDate = new Date();
    // targetDate.setDate(currentDate.getDate() + Number(15));
    // console.log({
    //     currentDate: currentDate.toISOString(),
    //     endDate: targetDate.toISOString()
    // });

    // const startDate = currentDate.toISOString()?.split("T")[0]; //T23:59:59.999+00:00
    // const endDate = targetDate.toISOString()?.split("T")[0] + "T23:59:59.999+00:00"; //T23:59:59.999+00:00

    // const result = await PaymentModel.create({
    //     subscriptionId: payload.subscriptionId,
    //     startDate,
    //     endDate,
    //     amount: 50,
    //     userId: employerUserId
    // })

    const subscriptions = await PaymentModel.aggregate([
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


    console.log(subscriptions);

    const modifiedResult = subscriptions.length > 0 ? subscriptions?.map((cv)=> ({
        ...cv,
        status: compareDate(cv.endDate)
    })) : [];

    return modifiedResult;
}

export default InitiatePaymentService;