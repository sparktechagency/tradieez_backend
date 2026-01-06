import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
    },
    senderId: {
      type: Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const MessageModel = model("Message", messageSchema);
export default MessageModel;
