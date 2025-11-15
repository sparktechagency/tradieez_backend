import { Secret } from "jsonwebtoken";
import config from "../../config";
import CustomError from "../../errors/CustomError";
import verifyToken from "../../utils/verifyToken";
import UserModel from "../../models/UserModel";
import { isJWTIssuedBeforePassChanged } from "../../utils/isJWTIssuedBeforePassChanged";
import createToken, { TExpiresIn } from "../../utils/createToken";
import EmployerModel from "../../models/EmployerModel";


const RefreshTokenService = async (token: string) => {
    if (!token) {
        throw new CustomError(401, `You are not unauthorized !`);
    }

    try {
        //token-verify
        const decoded = verifyToken(token, config.jwt_refresh_secret as Secret);

        //check if the user is exist
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            throw new CustomError(401, `You are unauthorized, user not found`);
        }

        //check if the user is already blocked
        const blockStatus = user.status;
        if (blockStatus === "blocked") {
            throw new CustomError(401, `You are unauthorized, This user is blocked`);
        }

        //check if passwordChangedAt is greater than token iat
        if (
            user?.passwordChangedAt &&
            isJWTIssuedBeforePassChanged(
                user?.passwordChangedAt,
                decoded.iat as number
            )
        ) {
            throw new CustomError(401, "You are not authorized !");
        }

        //check if user role is rmployer
        if (user.role === "employer") {
            const employer = await EmployerModel.findOne({ userId: user._id });
            if (!employer) {
                throw new CustomError(404, "User data not found")
            }

            //create accessToken
            const accessToken = createToken(
                { userId: String(user._id), email: user.email, fullName: employer.fullName, profileImg: employer.profileImg, role: user.role },
                config.jwt_access_secret as Secret,
                config.jwt_access_expires_in as TExpiresIn
            );

            return {
                accessToken
            };

        } else {
            //create accessToken
            const accessToken = createToken(
                { userId: String(user._id), email: user.email, fullName: "Super Admin", role: user.role },
                config.jwt_access_secret as Secret,
                config.jwt_access_expires_in as TExpiresIn
            );

            return {
                accessToken
            };
        }
    }catch{
        throw new CustomError(401, "You are unauthorized");
    }
};

export default RefreshTokenService;