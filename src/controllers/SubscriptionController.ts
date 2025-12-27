import CreateSubscriptionService from "../services/subscription/CreateSubscriptionService";
import asyncHandler from "../utils/asyncHandler";



const createSubscription = asyncHandler(async (req, res) => {
    const result = await CreateSubscriptionService(req.body);
    res.status(201).json({
        success: true,
        message: "Admin is created successfully",
        data: result
    })
})


const SubscriptionController = {
    createSubscription
}

export default SubscriptionController;