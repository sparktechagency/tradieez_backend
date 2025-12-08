/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import CustomError from "../../errors/CustomError";
import { IEmployerReview } from "../../interfaces/employerReview.interface";
import ApplicationModel from "../../models/ApplicationModel";
import JobModel from "../../models/Job.Model";
import EmployerModel from "../../models/EmployerModel";
import CandidateReviewModel from "../../models/CandidateReviewModel";


const PostCandidateReviewService = async (loginCandidateUserId: string, payload: IEmployerReview) => {
    const { jobId, employerUserId } = payload;

    //check job
    const job = await JobModel.findById(jobId);
    if (!job) {
        throw new CustomError(404, 'jobId not found');
    }

    //check employer
    const employer = await EmployerModel.findOne({
        userId: employerUserId
    });
    if (!employer) {
        throw new CustomError(404, "Employer Not Found with this provided ID");
    }

    //check application
    const application = await ApplicationModel.findOne({
        jobId,
        employerUserId,
        candidateUserId: loginCandidateUserId
    });

    if (!application) {
        throw new CustomError(404, 'Applied job not found');
    }

    //check status
    if(application.status !== "accepted"){
        throw new CustomError(400,  "You can only review a employer whose application has been accepted.")
    }

    //check workStatus
    if(application.workStatus !== "completed"){
        throw new CustomError(400, "You can only submit a review after the job is completed.")
    }

    // //check already provided review
    const review = await CandidateReviewModel.findOne({
        jobId,
        employerUserId,
        candidateUserId: loginCandidateUserId
    })
    if(review){
        throw new CustomError(409, "You have already submitted a review for this employer on this job.");
    }


    //transaction & rollback
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //post review
        await CandidateReviewModel.create([{
            ...payload,
            candidateUserId: loginCandidateUserId
        }], { session })


        //count average rating
        const averageRatingResult = await CandidateReviewModel.aggregate([
            {
                $match: {
                    employerUserId: new Types.ObjectId(employerUserId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$star"
                    },
                }
            }
        ],
        { session })

        const averageRating =
            averageRatingResult.length > 0
                ? Number((averageRatingResult[0].averageRating).toFixed(1))
                : employer.ratings;


        //update employer rating
        await EmployerModel.updateOne(
            { userId: employerUserId },
            { 
                ratings: averageRating, 
                $inc: { totalReviews: 1 }
            },
            { session, runValidators: true }
        )

        //transaction success
        await session.commitTransaction();
        await session.endSession();
        return null;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
}

export default PostCandidateReviewService