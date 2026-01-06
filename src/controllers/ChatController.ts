import { TUserRole } from "../interfaces/user.interface";
import CreateChatService from "../services/chat/CreateChatService";
import asyncHandler from "../utils/asyncHandler";


const createChat = asyncHandler(async (req, res) => {
    const { userId, role } = req.headers;
    const result = await CreateChatService(userId as string, role as TUserRole, req.body);
    res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
    })
})


const ChatController = {
    createChat
}
export default ChatController;