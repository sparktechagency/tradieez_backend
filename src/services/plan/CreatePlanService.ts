import CustomError from "../../errors/CustomError";
import { IPlan } from "../../interfaces/plan.interface";
import PlanModel from "../../models/PlanModel";
import convertToSlug from "../../utils/convertToSlug";

const CreatePlanService = async (payload: IPlan) => {
    const { name, validity } = payload;
    const slug = convertToSlug(name);
    payload.slug=slug

    //check plan is already existed
    const plan = await PlanModel.findOne({
        slug,
        validity
    });

    if (plan) {
        throw new CustomError(409, 'This plan already exists.');
    }

    if(validity==='monthly'){
        payload.duration=30;
    }
    if(validity==='yearly'){
        payload.duration=365;
    }

    const result = await PlanModel.create(payload);
    return result;
    
}

export default CreatePlanService;