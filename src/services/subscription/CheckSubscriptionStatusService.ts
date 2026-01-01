import { Types } from "mongoose";
import SubscriptionModel from "../../models/SubscriptionModel";


const CheckSubscriptionStatusService = async (employerUserId: string) => {
    const currentDateStr = new Date().toISOString().split("T")[0] + "T23:59:59.999+00:00";
    const currentDate = new Date(currentDateStr as string);

    const totalCountResult = await SubscriptionModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(employerUserId),
                endDate: { $gte: currentDate },
                paymentStatus: "paid"
            },
        },
        { $count: "totalCount" }
    ])

    const totalCount = totalCountResult[0]?.totalCount || 0;
    const isActive = totalCount > 0 ? true : false;

    return {
        isActive
    };
}

export default CheckSubscriptionStatusService;