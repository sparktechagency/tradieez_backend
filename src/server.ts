/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "http";
import app from "./app";
import dbConnect from "./utils/dbConnect";
import config from "./config";
import seedSuperAdmin from "./db";
import { Server } from "socket.io";
import { IMessagePayload } from "./interfaces/message.interface";
import CustomError from "./errors/CustomError";
import isNotObjectId from "./utils/isNotObjectId";
import ChatModel from "./models/ChatModel";
import mongoose, { Types } from "mongoose";
import MessageModel from "./models/MessageModel";

const server = http.createServer(app);

const port = config.port || 8080;

//Initialize socket.io server
if (config.vercel_server !== "yes") {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  console.log("No vercel");

  //store online users
  //export const userSocketMap = {}; //{ userId:socketId }
  // userId -> socketId map
  const userSocketMap: Record<string, string> = {};

  //socket.io connection handler

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    //console.log("User Connected", userId);
    console.log("🟢 User Connected", socket.id);

    if (userId) {
      userSocketMap[userId as string] = socket.id;
    }

    //emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //send online users

    /*==================================================== send message started ===============================================================*/
    /*==================================================== send message started ===============================================================*/
    socket.on("sendMessage", async (data: IMessagePayload) => {
      const { chatId, receiverId, senderId, text } = data;
      if (!chatId || !receiverId || !senderId || !text) {
        console.log("⚠️ Invalid Message");
      }
      //console.log("Message received:", data);

      if (!text) {
        throw new CustomError(400, "text is required");
      }

      if (isNotObjectId(chatId)) {
        throw new CustomError(400, "chatId must be a valid ObjectId");
      }

      const ObjectId = Types.ObjectId;

      const chat = await ChatModel.findOne({
        _id: chatId,
        members: { $all: [new ObjectId(senderId), new ObjectId(receiverId)] },
      });

      if (!chat) {
        throw new CustomError(
          404,
          "Converstion not found with the provided Id",
        );
      }

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
              senderId,
              text,
            },
          ],
          { session },
        );

        //emit or send the new message to the receiver's socket
        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", {
            ...newMessage[0],
            receiverId
          });
        }

        //console.log(newMessage);

        console.log("Message send success");

        //transaction success
        await session.commitTransaction();
        await session.endSession();
        return newMessage[0];
      } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
      }
    });
    /*==================================================== send message ended ===============================================================*/
    /*==================================================== send message ended ===============================================================*/

    //user disconnected
    socket.on("disconnect", () => {
      //console.log("User Disconnected", userId);
      console.log("🔴 User Disconnected", socket.id);
      delete userSocketMap[userId as string];

      io.emit("getOnlineUsers", Object.keys(userSocketMap)); //again send online users
    });
  });
}

async function main() {
  try {
    await dbConnect();
    await seedSuperAdmin();
    server.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

//asynchronous code error
process.on("unhandledRejection", (err) => {
  console.log(`❤❤ unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

//synchronous code error--process immediately off
process.on("uncaughtException", () => {
  console.log(`😛😛 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
