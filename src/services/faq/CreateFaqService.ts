import CustomError from "../../errors/CustomError";
import { IFaq } from "../../interfaces/faq.interface";
import FaqModel from "../../models/Faq.model";
import convertToSlug from "../../utils/convertToSlug";

const CreateFaqService = async (
    payload: IFaq,
) => {
    const { question } = payload;
    const slug = convertToSlug(question);
    payload.slug = slug;

    //check faq is already exist
    const faq = await FaqModel.findOne({ slug });
    if (faq) {
        throw new CustomError(409, "This question is already existed");
    }

    const result = await FaqModel.create(payload);

    return result;
};

export default CreateFaqService;