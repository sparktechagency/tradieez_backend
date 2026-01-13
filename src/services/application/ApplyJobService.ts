import CustomError from "../../errors/CustomError";
import { IApplication } from "../../interfaces/application.interface";
import ApplicationModel from "../../models/ApplicationModel";
import CandidateModel from "../../models/CandidateModel";
import JobModel from "../../models/Job.Model";

const ApplyJobService = async (loginUserId: string, payload: IApplication) => {
  //check job
  const job = await JobModel.findById(payload.jobId);
  if (!job) {
    throw new CustomError(404, "Job not found with the provided ID.");
  }

  //check cv is not uploaded
  const myProfile = await CandidateModel.findOne({ userId: loginUserId });
  if (!myProfile) {
    throw new CustomError(404, "Data not found");
  }

  if (!myProfile.cv) {
    throw new CustomError(
      400,
      "You need to upload your CV before applying for a job."
    );
  }

  const deadline = job.deadline;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadline.setHours(0, 0, 0, 0);

  if (deadline < today) {
    throw new CustomError(
      400,
      "The application deadline for this job has passed."
    );
  }

  //check already applied
  const appliedJob = await ApplicationModel.findOne({
    jobId: payload.jobId,
    employerUserId: job.userId,
    candidateUserId: loginUserId,
  });

  if (appliedJob) {
    throw new CustomError(409, "You have already applied for this job.");
  }

  //create application
  const result = await ApplicationModel.create({
    jobId: payload.jobId,
    employerUserId: job.userId,
    candidateUserId: loginUserId,
  });

  return result;
};

export default ApplyJobService;
