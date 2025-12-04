import CustomError from "../../errors/CustomError";
import { IEmployerReview } from "../../interfaces/employerReview.interface";
import ApplicationModel from "../../models/ApplicationModel";
import EmployerReviewModel from "../../models/EmployerReviewModel";


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

    //check status
    if(application.status !== "accepted"){
        throw new CustomError(400,  "You can only review a candidate whose application has been accepted.")
    }

    //check workStatus
    if(application.workStatus !== "completed"){
        throw new CustomError(400, "You can only submit a review after the job is completed.")
    }

    //check already provided review
    const review = await EmployerReviewModel.findOne({
        jobId,
        employerUserId: loginEmployerUserId,
        candidateUserId
    })
    if(review){
        throw new CustomError(409, "You have already submitted a review for this candidate on this job.");
    }

    //post review
    const result = await EmployerReviewModel.create({
        ...payload,
        employerUserId: loginEmployerUserId
    })
  
    return result;
}

export default PostEmployerReviewService