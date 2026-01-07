/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Types } from "mongoose";
import ChatModel from "../../models/ChatModel";
import { ICreateChatPylaod } from "../../interfaces/chat.interface";
import MessageModel from "../../models/MessageModel";
import UserModel from "../../models/UserModel";
import CustomError from "../../errors/CustomError";
import { TUserRole } from "../../interfaces/user.interface";

const CreateChatService = async (
  loginUserId: string,
  loginUserRole: TUserRole,
  payload: ICreateChatPylaod
) => {
  const { partnerId, text } = payload;

  if(loginUserId.toString() === partnerId){
    throw new CustomError(409, "partnerId & login user Id can't be same");
  }

  //check other user
  const otherUser = await UserModel.findById(partnerId);
  if (!otherUser) {
    throw new CustomError(404, "Parter not found with the provided Id");
  }

  if(loginUserRole === otherUser.role){
    throw new CustomError(409, "you can't send message between same type user");
  }

  const ObjectId = Types.ObjectId;
  const chatBody = {
    members: [loginUserId, partnerId],
    text: text,
  };

  //check chat
  const chat = await ChatModel.findOne({
    members: {
      $all: [new ObjectId(loginUserId), new ObjectId(partnerId)],
    },
  });

  //transaction & rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (chat) {
      const chatId = chat._id;
      await ChatModel.updateOne(
        { _id: new ObjectId(chatId) },
        { text: text },
        { session }
      );

      const newMessageBody = {
        chatId,
        senderId: loginUserId,
        text: text,
      };
      const newMessage = await MessageModel.create([newMessageBody], {
        session,
      });

      //transaction success
      await session.commitTransaction();
      await session.endSession();
      return {
        message: "Already conversation created",
        data: newMessage[0],
      };
    }

    //create new conversation/chat
    const conversation = await ChatModel.create([chatBody], { session });
    const conversionId = conversation[0]?._id;
    const messageBody = {
      chatId: conversionId,
      senderId: loginUserId,
      text: text,
    };

    const message = await MessageModel.create([messageBody], { session });
    //transaction success
    await session.commitTransaction();
    await session.endSession();
    return {
      message: "New conversation created",
      data: message[0],
    };
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export default CreateChatService;
