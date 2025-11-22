import CustomError from "../../errors/CustomError";
import CandidateModel from "../../models/CandidateModel";
import FavouriteCandidateModel from "../../models/FavoriteCandidateModel";


const AddRemoveFavouriteCandidateService = async (
  loginEmployerUserId: string,
  candidateUserId: string
) => {

  

  //check candidate doesn't exist
  const candidate = await CandidateModel.findOne({
    userId: candidateUserId
  });
  if (!candidate) {
    throw new CustomError(404, "candidateUserId Not Found");
  }


  //cheack candidate is already existed to favourite list
  const favourite = await FavouriteCandidateModel.findOne({
    employerUserId: loginEmployerUserId,
    candidateUserId
  })

  
  let result;
  let message;

  //if exist, remove it
  if(favourite){
    result = await FavouriteCandidateModel.deleteOne({ _id: favourite._id })
    message = "Candidate removed from your favorites list";
  }


   //if not exist, create a new one
   if(!favourite){
    result = await FavouriteCandidateModel.create({
        employerUserId: loginEmployerUserId,
        candidateUserId
    })
    message = "Candidate added to your favorites list";
   }

   return {
      message,
      data: result
   }
 
};

export default AddRemoveFavouriteCandidateService;