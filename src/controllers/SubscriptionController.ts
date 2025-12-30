import CreateSubscriptionService from "../services/subscription/CreateSubscriptionService";
import asyncHandler from "../utils/asyncHandler";


const createSubscription = asyncHandler(async (req, res) => {
    const employerUserId = req.headers.userId;
    const result = await CreateSubscriptionService(employerUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Subscription is initiated successfully",
        data: result
    })
})



const SubscriptionController = {
    createSubscription
}

export default SubscriptionController;