import { SUBSCRIPTION_VALID_FIELDS } from "../constant/subscription.constant";
import CreateSubscriptionService from "../services/subscription/CreateSubscriptionService";
import GetMySubscriptionsService from "../services/subscription/GetMySubscriptionsService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";


const createSubscription = asyncHandler(async (req, res) => {
    const employerUserId = req.headers.userId;
    const result = await CreateSubscriptionService(employerUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Subscription is initiated successfully",
        data: result
    })
})


const getMySubscriptions = asyncHandler(async (req, res) => {
    const employerUserId = req.headers.userId;
    const validatedQuery = pickValidFields(req.query, SUBSCRIPTION_VALID_FIELDS);
    const result = await GetMySubscriptionsService(employerUserId as string, validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Subscriptions are retrieved successfully',
        meta: result.meta,
        data: result.data,
    })
})


const SubscriptionController = {
    createSubscription,
    getMySubscriptions
}

export default SubscriptionController;