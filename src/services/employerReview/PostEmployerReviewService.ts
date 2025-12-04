import CustomError from "../../errors/CustomError";
import { IEmployerReview } from "../../interfaces/employerReview.interface";
import ApplicationModel from "../../models/ApplicationModel";


const PostEmployerReviewService = async (loginEmployerUserId: string, payload: IEmployerReview) => {
    const { jobId, candidateUserId } = payload;

    //check application
    const application = await ApplicationModel.findOne({
        jobId,
        employerUserId: loginEmployerUserId,
        candidateUserId
    });

    if (!application) {
        throw new CustomError(404, 'Applied job not found');
    }

    
    return "Create Employer Review Service";
}

export default PostEmployerReviewService