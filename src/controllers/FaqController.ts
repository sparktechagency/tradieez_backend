import { FAQ_VALID_FIELDS } from "../constant/faq.constant";
import CreateFaqService from "../services/faq/CreateFaqService";
import GetFaqsService from "../services/faq/GetFaqsService";
import GetUserFaqsService from "../services/faq/GetUserFaqsService";
import asyncHandler from "../utils/asyncHandler";
import pickValidFields from "../utils/pickValidFields";



const createFaq = asyncHandler(async (req, res) => {
    const result = await CreateFaqService(req.body);
    res.status(200).json({
        success: true,
        message: "Faq is created successfully.",
        data: result
    })
})

const getFaqs = asyncHandler(async (req, res) => {
    const validatedQuery = pickValidFields(req.query, FAQ_VALID_FIELDS);
    const result = await GetFaqsService(validatedQuery);
    res.status(200).json({
        success: true,
        message: 'Faqs are retrieved successfully',
        meta: result.meta,
        data: result.data,
    })
})

const getUserFaqs = asyncHandler(async (req, res) => {
    const result = await GetUserFaqsService();
    res.status(200).json({
        success: true,
        message: 'Faqs are retrieved successfully',
        data: result
    })
})




const FaqController = {
    createFaq,
    getFaqs,
    getUserFaqs
}

export default FaqController;