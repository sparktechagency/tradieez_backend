import FaqModel from "../../models/Faq.model";

const GetUserFaqsService = async () => {
    const result = await FaqModel.aggregate([
        {
            $match: {
                isActive: true
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $project: {
                category: 0,
                slug: 0,
                createdAt: 0,
                isActive: 0,
                updatedAt: 0
            }
        },
    ]);
    return result;
}

export default GetUserFaqsService;