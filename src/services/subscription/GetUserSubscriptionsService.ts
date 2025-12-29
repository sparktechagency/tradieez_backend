import SubscriptionModel from "../../models/SubscriptionModel"

const GetUserSubscriptionsService = async () => {
    const result = await SubscriptionModel.aggregate([
        {
            $match: {
                status: 'visible'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description:1,
                duration:1,
                validity:1,
                features:1,
            },
        }
    ])

    return result
}

export default GetUserSubscriptionsService