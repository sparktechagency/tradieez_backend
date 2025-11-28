import CustomError from "../../errors/CustomError";
import UserModel from "../../models/UserModel";
import sendForgotEmail from "../../utils/email/sendForgotEmail";
import generateOTP from "../../utils/generateOTP";

const ForgotPasswordSendOtpService = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new CustomError(404, `Couldn't find this email address`);
  }

  //check email is not verified
  if (!user.isVerified) {
    throw new CustomError(403, "Your account is not verified");
  }

  //check user is blocked
  if (user.status === "blocked") {
    throw new CustomError(403, "Your account is blocked !");
  }

  const otp = generateOTP();

  //set the forgot otp
  await UserModel.updateOne({ email }, { forgotOtp: otp, forgotOtpstatus: 0, forgotOtpExpires: new Date(+new Date() + 600000) });
  //send otp to the email address
  await sendForgotEmail(email, String(otp));
  return null;

};


export default ForgotPasswordSendOtpService;