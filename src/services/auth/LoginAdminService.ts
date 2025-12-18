import { Secret } from "jsonwebtoken";
import CustomError from "../../errors/CustomError";
import { ILogin } from "../../interfaces/auth.interface";
import UserModel from "../../models/UserModel";
import checkPassword from "../../utils/checkPassword";
import createToken, { TExpiresIn } from "../../utils/createToken";
import config from "../../config";
import AdminModel from "../../models/AdminModel";


const LoginAdminService = async (payload: ILogin) => {
  const user = await UserModel.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new CustomError(404, `Couldn't find this email address`);
  }

  //check email is not verified
  if (!user?.isVerified) {
    throw new CustomError(403, "Please verify your email");
  }

  //check user is blocked
  if (user.status === "blocked") {
    throw new CustomError(403, "Your account is blocked !")
  }

  //check you are not super_admin or admin
  if ((user.role !== "admin") && (user.role !== "superAdmin")) {
    throw new CustomError(403, `Sorry! You are not 'Super Admin' or 'Admin'`);
  }

  //check password
  const isPasswordMatch = await checkPassword(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new CustomError(400, 'Wrong Password');
  }


  //create access & refreshToken
  let accessToken: string;
  let refreshToken: string;

  if(user.role === "superAdmin"){
    accessToken = createToken({ userId: String(user._id), email: user.email, fullName:"Super Admin", role: user.role }, config.jwt_access_secret as Secret, config.jwt_access_expires_in as TExpiresIn);
    refreshToken = createToken({ userId: String(user._id), email: user.email, fullName:"Super Admin", role: user.role }, config.jwt_refresh_secret as Secret, config.jwt_refresh_expires_in as TExpiresIn);
  }
  else{
    const admin = await AdminModel.findOne({ userId: user._id });
    accessToken = createToken({ userId: String(user._id), email: user.email, fullName:admin?.fullName as string, profileImg:admin?.profileImg as string, role: user.role }, config.jwt_access_secret as Secret, config.jwt_access_expires_in as TExpiresIn);
    refreshToken = createToken({ userId: String(user._id), email: user.email, fullName:admin?.fullName as string, profileImg:admin?.profileImg as string, role: user.role }, config.jwt_refresh_secret as Secret, config.jwt_refresh_expires_in as TExpiresIn);
  }

  return {
    accessToken,
    refreshToken,
    message: `${user.role==="superAdmin" ? "Super Admin" : "Admin"} login success`
  }
}

export default LoginAdminService;