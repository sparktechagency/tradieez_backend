import { model, Schema } from "mongoose";

const chatSchema = new Schema(
    {
        members: [
           { type: Schema.Types.ObjectId}
        ],
        text: {
            type: String,
        },

   },
    { timestamps: true, versionKey:false},
);

const ChatModel = model('Chat', chatSchema);
export default ChatModel;
