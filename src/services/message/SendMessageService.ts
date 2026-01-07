/* eslint-disable @typescript-eslint/no-explicit-any */
import MessageModel from "../../models/MessageModel";
import ChatModel from "../../models/ChatModel";
import mongoose, { Types } from "mongoose";
import { IMessagePayload } from "../../interfaces/message.interface";
import CustomError from "../../errors/CustomError";
import isNotObjectId from "../../utils/isNotObjectId";

const SendMessageService = async (
  loginUserId: string,
  payload: IMessagePayload
) => {
  const { text, chatId } = payload;
  if (!text) {
    throw new CustomError(400, "text is required");
  }

  if (isNotObjectId(chatId)) {
    throw new CustomError(400, "chatId must be a valid ObjectId");
  }

  const chat = await ChatModel.findOne({
    _id: chatId,
    members: { $in: [new Types.ObjectId(loginUserId)] },
  });

  if (!chat) {
    throw new CustomError(404, "Converstion not found with the provided Id");
  }

  // const receiverId = chat.members
  //   .find((cv) => cv.toString() !== loginUserId.toString())
  //   ?.toString();

  //transaction & rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //update conversation
    await ChatModel.updateOne({ _id: chatId }, { text }, { session });

    //insert message
    const newMessage = await MessageModel.create(
      [
        {
          chatId,
          senderId: loginUserId,
          text,
        },
      ],
      { session }
    );

    //emit or send the new message to the receiver's socket
    // const receiverSocketId = userSocketMap[receiverId as string];
    // if (receiverSocketId) {
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    //transaction success
    await session.commitTransaction();
    await session.endSession();
    return newMessage[0];
  } catch (err:any) {
     await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export default SendMessageService;
