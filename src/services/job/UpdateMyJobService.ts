import CustomError from "../../errors/CustomError";
import { IJobPayload } from "../../interfaces/job.interface";
import CategoryModel from "../../models/CategoryModel";
import JobModel from "../../models/Job.Model";


const UpdateMyJobService = async (loginUserId: string, jobId: string, payload: Partial<IJobPayload>) => {
    const { categoryId, longitude, latitude, maxRange, minRange, startDate, endDate } = payload;

    //check job
    const job = await JobModel.findOne({ userId: loginUserId, _id: jobId });
    if (!job) {
        throw new CustomError(404, 'jobId not found');
    }

    //check categoryId
    if (categoryId) {
        const category = await CategoryModel.findById(categoryId)
        if (!category) {
            throw new CustomError(404, 'This categoryId not found');
        }
    }


    //location coordinates
    if (longitude && latitude) {
        payload.location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }
    }


    //check minRange & maxRange
    if (maxRange && !minRange) {
        if (job.minRange >= Number(maxRange)) {
            throw new CustomError(400, "Maximum range must be greater than minimum range")
        }
    }

    if (!maxRange && minRange) {
        if (minRange >= job.maxRange) {
            throw new CustomError(400, "Minimum range must be less than maximum range")
        }
    }


    //check startDate & endDate
    if(endDate && !startDate){
        const existJob = await JobModel.findOne({
            _id: jobId,
            userId: loginUserId,
            startDate: {
                $gt : new Date(endDate)
            }
        })

        if(existJob){
            throw new CustomError(400, "End date must be after start date")
        }
    }

    if (!endDate && startDate) {
        if (job.endDate) {
            const existJob = await JobModel.findOne({
                _id: jobId,
                userId: loginUserId,
                endDate: {
                    $lt: new Date(startDate)
                }
            })
            if (existJob) {
                throw new CustomError(400,"Start date must be before end date")
            }
        }

        if (!job.endDate) {
            const existJob = await JobModel.findOne({
                _id: jobId,
                userId: loginUserId,
                startDate: {
                    $gt: new Date(startDate)
                }
            })
            if (existJob) {
                throw new CustomError(400,"Start date must be before end date")
            }
        }
    }

    //update job
    const result = await JobModel.updateOne(
        { userId: loginUserId, _id: jobId },
        payload
    );
    return result;
}

export default UpdateMyJobService;