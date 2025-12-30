import CustomError from "../../errors/CustomError";
import { IPlan } from "../../interfaces/plan.interface";
import PlanModel from "../../models/PlanModel";
import convertToSlug from "../../utils/convertToSlug";
import isNotObjectId from "../../utils/isNotObjectId";

const UpdatePlanService = async (planId: string, payload: Partial<IPlan>) => {
    const { name, validity } = payload;
    if (isNotObjectId(planId)) {
        throw new CustomError(400, "planId must be a valid ObjectId")
    }

    const plan = await PlanModel.findById(planId);
    if (!plan) {
        throw new CustomError(404, 'Plan not found with the provided ID');
    }


    //if name is available but validity is not available
    if (name && !validity) {
        const slug = convertToSlug(name);
        payload.slug = slug;
        const planExist = await PlanModel.findOne({
            _id: { $ne: planId },
            slug,
            validity: plan.validity
        });
        if (planExist) {
            throw new CustomError(409, 'Sorry, This plan already exists.');
        }
    }

     //if name is unavailable but validity is available
    if (!name && validity) {
        const planExist = await PlanModel.findOne({
            _id: { $ne: planId },
            slug: plan.slug,
            validity
        });
        if (planExist) {
            throw new CustomError(409, 'Sorry, This plan already exists.');
        }
        if (validity === 'monthly') {
            payload.duration = 30;
        }
        if (validity === 'yearly') {
            payload.duration = 365;
        }
    }


    //if name & validity are available
    if (name && validity) {
        const slug = convertToSlug(name);
        payload.slug = slug;
        const planExist = await PlanModel.findOne({
            _id: { $ne: planId },
            slug,
            validity
        });
        if (planExist) {
            throw new CustomError(409, 'Sorry, This plan plan already exists.');
        }
        if (validity === 'monthly') {
            payload.duration = 30;
        }
        if (validity === 'yearly') {
            payload.duration = 365;
        }
    }

    const result = await PlanModel.updateOne(
        { _id: planId },
        payload,
        { runValidators: true}
    )

    return result;
}

export default UpdatePlanService;