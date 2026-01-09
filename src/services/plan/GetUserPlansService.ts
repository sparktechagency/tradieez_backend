import PlanModel from "../../models/PlanModel"

const GetUserPlansService = async () => {
    const result = await PlanModel.aggregate([
        {
            $match: {
                status: 'visible'
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                price:1,
                description:1,
                duration:1,
                validity:1,
                features:1,
            },
        }
    ])

    return result
}

export default GetUserPlansService