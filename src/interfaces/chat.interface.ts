import { Document, Types } from "mongoose";

export interface IChat extends Document {
  members: Types.ObjectId[];
  text?: string;
}
