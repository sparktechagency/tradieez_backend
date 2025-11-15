import config from "../config";
import ChangePasswordService from "../services/auth/ChangePasswordService";
import ForgotPasswordSendOtpService from "../services/auth/ForgotPasswordSendOtpService";
import ForgotPasswordSetNewPasswordService from "../services/auth/ForgotPasswordSetNewPasswordService";
import ForgotPasswordVerifyOtpService from "../services/auth/ForgotPasswordVerifyOtpService";
import LoginAdminService from "../services/auth/LoginAdminService";
import LoginUserService from "../services/auth/LoginUserService"
import RefreshTokenService from "../services/auth/RefreshTokenService";
import RegisterEmployerService from "../services/auth/RegisterEmployerService";
import ResendVerificationEmailService from "../services/auth/ResendVerificationEmailService";
import VerifyEmailService from "../services/auth/VerifyEmailService";
import asyncHandler from "../utils/asyncHandler";



const registerEmployer = asyncHandler(async (req, res) => {
    const result = await RegisterEmployerService(req.body);
    res.status(201).json({
        success: true,
        message: result.message,
        data: null
    })
})


const verifyEmail = asyncHandler(async (req, res) => {
    const result = await VerifyEmailService(req.body);
    res.status(200).json({
        success: true,
        message: "Email is verified successfully",
        data: result
    })
})


const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await ResendVerificationEmailService(email);
    res.status(200).json({
        success: true,
        message: "Verification email resent. Please check your inbox.",
        data: result
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await LoginUserService(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        secure: config.node_env === "production", 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        sameSite: "strict", // Prevents CSRF attacks
    });

    res.status(200).json({
        success: true,
        message: "Login Success",
        data: {
            accessToken
        }
    })
})


const loginAdmin = asyncHandler(async (req, res) => {
    const { message, accessToken, refreshToken } = await LoginAdminService(req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        secure: config.node_env === "production", 
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        sameSite: "strict", // Prevents CSRF attacks
    });

    res.status(200).json({
        success: true,
        message: message || "Login Success",
        data: {
            accessToken
        }
    })
})


const forgotPasswordSendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await ForgotPasswordSendOtpService(email);
    res.status(200).json({
        success: true,
        message: "OTP has been sent to your email address.",
        data: result
    })
})

const forgotPasswordVerifyOtp = asyncHandler(async (req, res) => {
    const result = await ForgotPasswordVerifyOtpService(req.body);
    res.status(200).json({
        success: true,
        message: "OTP is verified successfully.",
        data: result
    })
})

const forgotPasswordSetNewPassword = asyncHandler(async (req, res) => {
    const result = await ForgotPasswordSetNewPasswordService(req.body);
    res.status(200).json({
        success: true,
        message: "Your password has been updated successfully.",
        data: result
    })
})

const changePassword = asyncHandler(async (req, res) => {
    const loginUserId = req.headers.userId;
    const { accessToken, refreshToken } = await ChangePasswordService(loginUserId as string, req.body);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.node_env === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict", // Prevents CSRF attacks
    });

    res.status(200).json({
        success: true,
        message: "Your password has been updated successfully.",
        data: {
            accessToken
        }
    })
})


const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await RefreshTokenService(refreshToken);
    res.status(200).json({
        success: true,
       message: 'Access token is retrieved successfully',
        data: result
    })
})


const AuthController = {
    registerEmployer,
    verifyEmail,
    resendVerificationEmail,
    loginUser,
    loginAdmin,
    forgotPasswordSendOtp,
    forgotPasswordVerifyOtp,
    forgotPasswordSetNewPassword,
    changePassword,
    refreshToken
}

export default AuthController;