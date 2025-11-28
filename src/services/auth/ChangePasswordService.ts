import { Secret } from "jsonwebtoken";
import CustomError from "../../errors/CustomError";
import { IChangePassword } from "../../interfaces/auth.interface";
import EmployerModel from "../../models/EmployerModel";
import UserModel from "../../models/UserModel";
import checkPassword from "../../utils/checkPassword";
import createToken, { TExpiresIn } from "../../utils/createToken";
import hashedPassword from "../../utils/hashedPassword";
import config from "../../config";


const ChangePasswordService = async (loginUserId: string, payload: IChangePassword) => {
    const { currentPassword, newPassword } = payload;

    const user = await UserModel.findById(loginUserId).select('+password');

    if(!user){
        throw new CustomError(404, "User not found");
    }


    //checking if the password is not correct
    const isPasswordMatched = await checkPassword(
        currentPassword,
        user?.password as string
    );

    if (!isPasswordMatched) {
        throw new CustomError(403, 'Wrong Current Password');
    }

    //hash the newPassword
    const hashPass = await hashedPassword(newPassword);

    //update the password
    await UserModel.updateOne(
        { _id: loginUserId },
        { password: hashPass, passwordChangedAt: new Date(Date.now() - 20000) }
    );

    if (user.role === "employer") {
        const employer = await EmployerModel.findOne({ userId: user._id });
        if (!employer) {
            throw new CustomError(404, "User not found")
        }

        //create accessToken
        const accessToken = createToken(
            { userId: String(user._id), email: user.email, fullName: employer.fullName, profileImg: employer.profileImg, role: user.role },
            config.jwt_access_secret as Secret,
            config.jwt_access_expires_in as TExpiresIn
        );
        //create refreshToken
        const refreshToken = createToken(
            { userId: String(user._id), email: user.email, fullName: employer.fullName, profileImg: employer.profileImg, role: user.role },
            config.jwt_refresh_secret as Secret,
            config.jwt_refresh_expires_in as TExpiresIn
        );

        return {
            accessToken,
            refreshToken
        };

    } else {
        
        //create accessToken
        const accessToken = createToken(
            { userId: String(user._id), email: user.email, fullName: "Super Admin", role: user.role },
            config.jwt_access_secret as Secret,
            config.jwt_access_expires_in as TExpiresIn
        );
        //create refreshToken
        const refreshToken = createToken(
            { userId: String(user._id), email: user.email, fullName: "Super Admin", role: user.role },
            config.jwt_refresh_secret as Secret,
            config.jwt_refresh_expires_in as TExpiresIn
        );

        return {
            accessToken,
            refreshToken
        };
    }


}

export default ChangePasswordService;