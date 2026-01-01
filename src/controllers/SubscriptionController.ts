import { SUBSCRIPTION_VALID_FIELDS } from "../constant/subscription.constant";
import CheckSubscriptionStatusService from "../services/subscription/CheckSubscriptionStatusService";
import CreateSubscriptionService from "../services/subscription/CreateSubscriptionService";
import GetMySubscriptionsService from "../services/subscription/GetMySubscriptionsService";
import GetSubscriptionsService from "../services/subscription/GetSubscriptionsService";
import VerifySessionService from "../services/subscription/VerifySessionService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";


const createSubscription = asyncHandler(async (req, res) => {
    const { email, userId } = req.headers;
    const result = await CreateSubscriptionService(userId as string, email as string, req.body);
    res.status(200).json({
        success: true,
        message: "Subscription is initiated successfully",
        data: result
    })
})

const verifySession = asyncHandler(async (req, res) => {
    const { sessionId } = req.query;
    const result = await VerifySessionService(sessionId as string);
    res.status(200).json({
        success: true,
        message: 'Payment Successful',
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

const getSubscriptions = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, SUBSCRIPTION_VALID_FIELDS);
    const result = await GetSubscriptionsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Subscriptions are retrieved successfully',
        meta: result.meta,
        data: result.data,
    })
})



const checkSubscriptionStatus = asyncHandler(async (req, res) => {
    const { userId } = req.headers;
    const result = await CheckSubscriptionStatusService(userId as string);
    res.status(200).json({
        success: true,
        message: "Subscription status checked successfully",
        data: result
    })
})


const SubscriptionController = {
    createSubscription,
    getMySubscriptions,
    getSubscriptions,
    verifySession,
    checkSubscriptionStatus
}

export default SubscriptionController;