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

  //console.log("No vercel");

  //store online users
  //export const userSocketMap = {}; //{ userId:socketId }
  // userId -> socketId map
  const userSocketMap: Record<string, string> = {};

  //socket.io connection handler

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    //console.log("User Connected", userId);
    //console.log("🟢 User Connected", socket.id);

    if (userId) {
      userSocketMap[userId as string] = socket.id;
    }

    //emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //send online users

    /*==================================================== send message started ===============================================================*/
    /*==================================================== send message started ===============================================================*/
    socket.on("sendMessage", async (data: IMessagePayload) => {
      const session = await mongoose.startSession();
      //console.log("Received New Message", data);

      try {
        const { chatId, receiverId, senderId, text } = data;

        if (!text) {
          socket.emit("errorMessage", { message: "Text is required" });
          return;
        }

        if (isNotObjectId(chatId)) {
          socket.emit("errorMessage", { message: "Invalid chatId" });
          return;
        }

        const ObjectId = Types.ObjectId;

        const chat = await ChatModel.findOne({
          _id: chatId,
          members: { $all: [new ObjectId(senderId), new ObjectId(receiverId)] },
        });

        if (!chat) {
          socket.emit("errorMessage", { message: "Conversation not found" });
          return;
        }

        session.startTransaction();

       await ChatModel.updateOne(
          { _id: new Types.ObjectId(chatId) },
          { text: text }, // ✅ better field name
          { session },
        );


        const [newMessage] = await MessageModel.create(
          [{ chatId, senderId, text }],
          { session },
        );

        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("newMessage", {
            _id: newMessage?._id,
            chatId: newMessage?.chatId,
            senderId: newMessage?.senderId,
            text: newMessage?.text,
            createdAt: newMessage?.createdAt,
            receiverId,
          });
        }

        //console.log("Send Message success");

        await session.commitTransaction();
        await session.endSession();
      } catch (err) {
        await session.abortTransaction();
        await session.endSession();

        console.error("SendMessage error:", err);
        socket.emit("errorMessage", { message: "Failed to send message" });
      }
    });

    /*==================================================== send message ended ===============================================================*/
    /*==================================================== send message ended ===============================================================*/

    //user disconnected
    socket.on("disconnect", () => {
      //console.log("User Disconnected", userId);
      //console.log("🔴 User Disconnected", socket.id);
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
