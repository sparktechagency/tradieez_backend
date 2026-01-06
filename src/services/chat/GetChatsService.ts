import ChatModel from "../../models/ChatModel";
import { Types } from "mongoose";

const GetChatsService = async (loginUserId: string) => {
  const result = await ChatModel.aggregate([
    { $match: { members: { $in: [new Types.ObjectId(loginUserId)] } } },
    { $sort: { updatedAt: -1 } },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "Members",
      },
    },
  ]);

  return result;
  
};

export default GetChatsService;
