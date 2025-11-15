import { Secret } from "jsonwebtoken";
import CustomError from "../../errors/CustomError";
import { ILogin } from "../../interfaces/auth.interface";
import UserModel from "../../models/UserModel";
import checkPassword from "../../utils/checkPassword";
import createToken, { TExpiresIn } from "../../utils/createToken";
import config from "../../config";
import EmployerModel from "../../models/EmployerModel";

const LoginUserService = async (payload: ILogin) => {
    const { email, password } = payload;
    const user = await UserModel.findOne({ email }).select(
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
    const isPasswordMatch = await checkPassword(password, user.password);
    if (!isPasswordMatch) {
        throw new CustomError(400, "Wrong Password");
    }

    //check you are not candidate or employer
    if ((user.role !== "candidate") && (user.role !== "employer")) {
        throw new CustomError(403, `Sorry! You have no access to login`);
    }

    
    if (user.role === "employer") {
        const employer = await EmployerModel.findOne({ email, userId: user._id });
        if(!employer){
            throw new CustomError(404, "User data not found")
        }

        //create accessToken
        const accessToken = createToken(
            { userId: String(user._id), email: user.email, fullName: employer.fullName, profileImg:employer.profileImg, role: user.role },
            config.jwt_access_secret as Secret,
            config.jwt_access_expires_in as TExpiresIn
        );
        //create refreshToken
        const refreshToken = createToken(
             { userId: String(user._id), email: user.email, fullName: employer.fullName, profileImg:employer.profileImg, role: user.role },
            config.jwt_refresh_secret as Secret,
            config.jwt_refresh_expires_in as TExpiresIn
        );

        return {
            accessToken,
            refreshToken
        };

    }else{

        const employer = await EmployerModel.findOne({ email, userId: user._id });
        if(!employer){
            throw new CustomError(404, "User data not found")
        }

        //create accessToken
        const accessToken = createToken(
            { userId: String(user._id), email: user.email, fullName: employer.fullName, profileImg:employer.profileImg, role: user.role },
            config.jwt_access_secret as Secret,
            config.jwt_access_expires_in as TExpiresIn
        );
        //create refreshToken
        const refreshToken = createToken(
             { userId: String(user._id), email: user.email, fullName: employer.fullName, profileImg:employer.profileImg, role: user.role },
            config.jwt_refresh_secret as Secret,
            config.jwt_refresh_expires_in as TExpiresIn
        );

        return {
            accessToken,
            refreshToken
        };
    }
}


export default LoginUserService;