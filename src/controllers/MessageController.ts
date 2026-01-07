import GetMessagesService from "../services/message/GetMessagesService";
import SendMessageService from "../services/message/SendMessageService";
import asyncHandler from "../utils/asyncHandler";


const sendMessage = asyncHandler(async (req, res) => {
     const { userId } = req.headers;
    const result = await SendMessageService(userId as string, req.body);
    res.status(200).json({
        success: true,
        message: 'Message is sent successfully',
        data: result,
    })
})

const getMessages = asyncHandler(async (req, res) => {
     const { userId } = req.headers;
     const { chatId } = req.params;
    const result = await GetMessagesService(userId as string, chatId as string);
    res.status(200).json({
        success: true,
        message: 'Messages are retrieved successfully',
        data: result,
    })
})

const MessageController = {
    sendMessage,
    getMessages
}
export default MessageController;