import InitiatePaymentService from "../services/payment/InitiatePaymentService";
import asyncHandler from "../utils/asyncHandler";


const initiatePayment = asyncHandler(async (req, res) => {
    const employerUserId = req.headers.userId;
    const result = await InitiatePaymentService(employerUserId as string, req.body);
    res.status(200).json({
        success: true,
        message: "Payment is initiated successfully",
        data: result
    })
})



const PaymentController = {
    initiatePayment
}

export default PaymentController;