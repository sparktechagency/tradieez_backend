import CustomError from "../../errors/CustomError";
import CandidateModel from "../../models/CandidateModel";
import sendRequestEmail from "../../utils/email/sendRequestEmail";
import isNotObjectId from "../../utils/isNotObjectId";

const SendRequestService = async(employerName:string, candidateUserId: string) => {
  if (isNotObjectId(candidateUserId)) {
    throw new CustomError(400, "userId must be a valid ObjectId");
  } 

  //check candidate
  const candidate = await CandidateModel.findOne({ userId: candidateUserId });
  if (!candidate) {
    throw new CustomError(404, "Candidate not found with the provided ID");
  }


  if(!candidate.isPrivate){
    throw new CustomError(409, "Candidate profile is already public")
  }

  //send email to candidate
  await sendRequestEmail(candidate.email, employerName);
  
  return null;
};

export default SendRequestService;
