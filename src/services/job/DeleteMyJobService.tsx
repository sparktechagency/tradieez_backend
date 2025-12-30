/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import CustomError from "../../errors/CustomError";
import JobModel from "../../models/Job.Model";
import isNotObjectId from "../../utils/isNotObjectId";
import FavoriteJobModel from "../../models/FavoriteJobModel";
import ApplicationModel from "../../models/ApplicationModel";

const DeleteMyJobService = async (loginUserId: string, jobId: string) => {
    if (isNotObjectId(jobId)) {
        throw new CustomError(400, "jobId must be a valid ObjectId")
    }
    const job = await JobModel.findOne({ _id: jobId, userId: loginUserId })
    if(!job){
        throw new CustomError(404, 'This jobId not found');
    }

    //check if jobId is associated with applied job
    const associatedWithAppliedJob = await ApplicationModel.findOne({
         jobId
    });
    if(associatedWithAppliedJob){
        throw new CustomError(409, 'Unable to delete, This job is associated with one or more applications');
    }

   //transaction & rollback
    const session = await mongoose.startSession();
    
    try {

        session.startTransaction();

        //delete favorite job
        await FavoriteJobModel.deleteMany(
            { jobId },
            { session }
        )

        //delete the job
        const result = await JobModel.deleteOne(
            {_id: jobId, userId: loginUserId },
            { session }
        )

        //transaction success
        await session.commitTransaction();
        await session.endSession();
        return result;
    }
    catch (err:any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    } 
   
}

export default DeleteMyJobService;