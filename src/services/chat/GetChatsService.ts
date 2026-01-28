import { CHAT_SEARCHABLE_Fields } from "../../constant/chat.constant";
import { makeSearchQuery } from "../../helper/QueryBuilder";
import { TChatQuery } from "../../interfaces/chat.interface";
import { TUserRole } from "../../interfaces/user.interface";
import ChatModel from "../../models/ChatModel";
import { Types } from "mongoose";

const GetChatsService = async (
  loginUserId: string,
  loginUserRole: TUserRole,
  query: TChatQuery,
) => {
  const { searchTerm } = query;

  let searchQuery = {};
  if (searchTerm) {
    searchQuery = makeSearchQuery(searchTerm, CHAT_SEARCHABLE_Fields);
  }

  if (loginUserRole === "candidate") {
    const result = await ChatModel.aggregate([
      { $match: { members: { $in: [new Types.ObjectId(loginUserId)] } } },
      { $sort: { updatedAt: -1 } },
      {
        $lookup: {
          from: "employers",
          let: { memberIds: "$members" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$userId", "$$memberIds"] },
                    { $ne: ["$_id", new Types.ObjectId(loginUserId)] }, // exclude login user
                  ],
                },
              },
            },
            { $project: { userId: 1, fullName: 1, profileImg: 1 } }, // hide sensitive info
          ],
          as: "otherMembers",
        },
      },
      { $unwind: { path: "$otherMembers", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          receiverId: "$otherMembers.userId",
          fullName: "$otherMembers.fullName",
          profileImg: "$otherMembers.profileImg",
          lastMessage: "$text",
          updatedAt: "$updatedAt",
        },
      },
      {
        $match: {
          ...searchQuery,
        },
      },
    ]);

    return result;
  }

  const result = await ChatModel.aggregate([
    { $match: { members: { $in: [new Types.ObjectId(loginUserId)] } } },
    { $sort: { updatedAt: -1 } },
    {
      $lookup: {
        from: "candidates",
        let: { memberIds: "$members" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$userId", "$$memberIds"] },
                  { $ne: ["$_id", new Types.ObjectId(loginUserId)] }, // exclude login user
                ],
              },
            },
          },
          { $project: { userId: 1, fullName: 1, profileImg: 1 } }, // hide sensitive info
        ],
        as: "otherMembers",
      },
    },
    { $unwind: { path: "$otherMembers", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        receiverId: "$otherMembers.userId",
        fullName: "$otherMembers.fullName",
        profileImg: "$otherMembers.profileImg",
        lastMessage: "$text",
        updatedAt: "$updatedAt",
      },
    },
    {
      $match: {
        ...searchQuery,
      },
    },
  ]);

  return result;
};

export default GetChatsService;
