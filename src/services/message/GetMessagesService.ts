import { Types } from "mongoose";
import MessageModel from "../../models/MessageModel";
import ChatModel from "../../models/ChatModel";
import CustomError from "../../errors/CustomError";
import isNotObjectId from "../../utils/isNotObjectId";

const GetMessagesService = async (loginUserId: string, chatId: string) => {
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

  const result = await MessageModel.aggregate([
    {
      $match: {
        chatId: new Types.ObjectId(chatId),
      },
    },
    {
      $project: {
        _id: 0,
        updatedAt: 0,
      },
    },
    { $sort: { createdAt: 1 } },
  ]);

  return result;
};

export default GetMessagesService;
