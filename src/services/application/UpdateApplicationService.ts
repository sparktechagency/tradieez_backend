import { Types } from "mongoose";
import CustomError from "../../errors/CustomError";
import { IApplication } from "../../interfaces/application.interface";
import ApplicationModel from "../../models/ApplicationModel";
import sendApplicationAcceptedEmail from "../../utils/email/sendApplicationAcceptedEmail";
import isNotObjectId from "../../utils/isNotObjectId";
import sendApplicationShortlistedEmail from "../../utils/email/sendApplicationShortlistedEmail";
import sendApplicationRejectedEmail from "../../utils/email/sendApplicationRejectedEmail";
import sendApplicationCancelledEmail from "../../utils/email/sendApplicationCancelledEmail";

const UpdateApplicationService = async (
  loginEmployerUserId: string,
  employerName: string,
  applicationId: string,
  payload: Partial<IApplication>
) => {
  if (isNotObjectId(applicationId)) {
    throw new CustomError(400, "applicationId must be a valid ObjectId");
  }

  //check application
  const application = await ApplicationModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(applicationId),
        employerUserId: new Types.ObjectId(loginEmployerUserId),
      },
    },
    {
      $lookup: {
        from: "candidates",
        localField: "candidateUserId",
        foreignField: "userId",
        as: "candidate",
      },
    },
    {
      $unwind: "$candidate",
    },
    {
      $lookup: {
        from: "jobs",
        localField: "jobId",
        foreignField: "_id",
        as: "job",
      },
    },
    {
      $unwind: "$job",
    },
    {
      $project: {
        title: "$job.title",
        candidateName: "$candidate.fullName",
        candidateEmail: "$candidate.email",
      },
    },
  ]);

  if (application.length === 0) {
    throw new CustomError(404, "Application not found with the provided ID");
  }

  //update application
  const result = await ApplicationModel.updateOne(
    {
      _id: applicationId,
      employerUserId: loginEmployerUserId,
    },
    payload,
    { runValidators: true }
  );

  if (payload.status) {
    if (payload.status === "accepted") {
      await sendApplicationAcceptedEmail(
        application[0].candidateEmail,
        application[0].candidateName,
        employerName,
        application[0].title
      );
    }
    if (payload.status === "shortlisted") {
      await sendApplicationShortlistedEmail(
        application[0].candidateEmail,
        application[0].candidateName,
        employerName,
        application[0].title
      );
    }
    if (payload.status === "rejected") {
      await sendApplicationRejectedEmail(
        application[0].candidateEmail,
        application[0].candidateName,
        employerName,
        application[0].title
      );
    }
    if (payload.status === "cancelled") {
      await sendApplicationCancelledEmail(
        application[0].candidateEmail,
        application[0].candidateName,
        employerName,
        application[0].title
      );
    }
  }

  return result;
};

export default UpdateApplicationService;
