import { Document, Types } from "mongoose";

export interface IMessage extends Document{
  chatId: Types.ObjectId;
  senderId: Types.ObjectId;
  text?: string;
}

export interface IMessagePayload {
  chatId: string;
  senderId: string;
  receiverId: string
  text: string;
}

