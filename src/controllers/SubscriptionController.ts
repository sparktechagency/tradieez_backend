import { SUBSCRIPTION_VALID_FIELDS } from "../constant/subscription.constant";
import CreateSubscriptionService from "../services/subscription/CreateSubscriptionService";
import GetSubscriptionsService from "../services/subscription/GetSubscriptionsService";
import GetUserSubscriptionsService from "../services/subscription/GetUserSubscriptionsService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";



const createSubscription = asyncHandler(async (req, res) => {
    const result = await CreateSubscriptionService(req.body);
    res.status(201).json({
        success: true,
        message: "Subscription is created successfully",
        data: result
    })
})

const getSubscriptions = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, SUBSCRIPTION_VALID_FIELDS);
    const result = await GetSubscriptionsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: "Subscriptions are retrieved successfully",
        meta: result.meta,
        data: result.data
    })
})

const getUserSubscriptions = asyncHandler(async (req, res) => {
    const result = await GetUserSubscriptionsService();
    res.status(200).json({
        success: true,
        message: "Subscriptions are retrieved successfully",
        data: result
    })
})

const SubscriptionController = {
    createSubscription,
    getSubscriptions,
    getUserSubscriptions
}

export default SubscriptionController;