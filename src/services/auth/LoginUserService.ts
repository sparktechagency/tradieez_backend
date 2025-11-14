import { Secret } from "jsonwebtoken";
import CustomError from "../../errors/CustomError";
import { ILogin } from "../../interfaces/auth.interface";
import UserModel from "../../models/UserModel";
import checkPassword from "../../utils/checkPassword";
import createToken, { TExpiresIn } from "../../utils/createToken";
import config from "../../config";

const LoginUserService = async (payload: ILogin) => {
    const user = await UserModel.findOne({ email: payload.email }).select(
        "+password"
    );
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

    //check password
    const isPasswordMatch = await checkPassword(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new CustomError(400, "Wrong Password");
    }

    //check you are not user
    if ((user.role !== "candidate") && (user.role !== "employer")) {
        throw new CustomError(403, `Sorry! You have no access to login`);
    }

    //create accessToken
    const accessToken = createToken(
        { email: user.email, fullName: user?.fullName, phone: user?.phone, id: String(user._id), role: user.role },
        config.jwt_access_secret as Secret,
        config.jwt_access_expires_in as TExpiresIn
    );
    //create refreshToken
    const refreshToken = createToken(
        { email: user.email, fullName: user?.fullName, id: String(user._id), role: user.role },
        config.jwt_refresh_secret as Secret,
        config.jwt_refresh_expires_in as TExpiresIn
    );

    return {
        accessToken,
    };
}


export default LoginUserService;