/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import CustomError from "../../errors/CustomError";
import UserModel from "../../models/UserModel";
import checkPassword from "../../utils/checkPassword";
import FavoriteJobModel from "../../models/FavoriteJobModel";
import FavoriteCandidateModel from "../../models/FavoriteCandidateModel";

const DeleteMyAccountService = async (loginUserId: string, password: string) => {
  const ObjectId = Types.ObjectId;
  const user = await UserModel.findById(loginUserId).select('+password');
  if(!user){
    throw new CustomError(404, "User Not Found");
  }

   //check password
   const isPasswordMatch = await checkPassword(password, user.password);
   if (!isPasswordMatch) {
       throw new CustomError(400, 'Password is not correct');
   }

  //transaction & rollback
 const session = await mongoose.startSession();

  try{
    session.startTransaction();

    //delete favorite job
    await FavoriteJobModel.deleteOne({ ownerId: new ObjectId(loginUserId) }, { session });

    //delete favorite candidate
    await FavoriteCandidateModel.deleteOne({ ownerId: new ObjectId(loginUserId) }, { session })

    //delete social media
    //await SocialMediaModel.deleteOne({ ownerId: loginUserId }, { session });

    //delete menus
    //await MenuModel.deleteMany({ ownerId: loginUserId }, { session })

    //delete favourite list
    //await FavouriteModel.deleteMany({ userId: loginUserId }, { session } )

    //delete the reviews
    //await ReviewModel.deleteMany({ userId: loginUserId }, { session })
    
    //delete the menu reviews
    //await MenuReviewModel.deleteMany({ userId: loginUserId }, { session })

    //delete the menu reviews
    //await ScheduleModel.deleteMany({ ownerId: loginUserId }, { session })

     //delete user
     const result = await UserModel.deleteOne({ _id: new ObjectId(loginUserId) }, { session })
     await session.commitTransaction();
     await session.endSession();
     return result;
  }
  catch(err:any){
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err)
  }
}

export default DeleteMyAccountService;