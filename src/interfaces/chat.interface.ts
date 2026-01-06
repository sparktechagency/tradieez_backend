import { Document, Types } from "mongoose";

export interface IChat extends Document {
  members: Types.ObjectId[];
  text?: string;
}

export interface ICreateChatPylaod {
  partnerId: string;
  text: string;
}