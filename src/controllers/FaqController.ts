import CreateFaqService from "../services/faq/CreateFaqService";
import asyncHandler from "../utils/asyncHandler";



const createFaq = asyncHandler(async (req, res) => {
    const result = await CreateFaqService(req.body);
    res.status(200).json({
        success: true,
        message: "Faq is created successfully.",
        data: result
    })
})




const FaqController = {
    createFaq
}

export default FaqController;