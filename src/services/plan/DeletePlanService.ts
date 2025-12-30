import CustomError from "../../errors/CustomError";
import PlanModel from "../../models/PlanModel";
import isNotObjectId from "../../utils/isNotObjectId";


const DeletePlanService = async (planId: string) => {
    if (isNotObjectId(planId)) {
        throw new CustomError(400, "planId must be a valid ObjectId")
    }
    const plan = await PlanModel.findById(planId)
    if(!plan){
        throw new CustomError(404, 'Plan not found with the provided ID');
    }

    const result = await PlanModel.deleteOne({ _id: planId})
    return result;
}

export default DeletePlanService;