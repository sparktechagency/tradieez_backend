/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import config from "../config";
import { Secret } from "jsonwebtoken";
import verifyToken from "../utils/verifyToken";
import { isJWTIssuedBeforePassChanged } from "../utils/isJWTIssuedBeforePassChanged";
import UserModel from "../models/UserModel";

type TUserRole = "candidate" | "employer" | "admin" | "superAdmin";

const AuthMiddleware = (...roles: TUserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
          error: {
            message: "jwt token must be provided",
          },
        });
      }


      //token-verify
      const decoded = verifyToken(token, config.jwt_access_secret as Secret);

      //check if role is matching
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
          error: {
            message: `Please, provide ${roles.map(role=>`'${role}'`).join(" or ")} token`,
          },
        });
      }

      
      const user = await UserModel.findById(decoded.id);

      //check if user is not exist
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
          error: {
            message: "This user is not existed",
          },
        });
      }

      //check if the user is blocked
      const blockStatus = user.status;
      if (blockStatus === "blocked") {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
          error: {
            message: "This user is blocked",
          },
        });
      }

      //check if the user email is not verified
      if(!user?.isVerified){
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
          error: {
            message: "This Account is not verified",
          },
        });
      }

      //check if passwordChangedAt is greater than token iat
      if (
        user?.passwordChangedAt &&
        isJWTIssuedBeforePassChanged(user?.passwordChangedAt, decoded.iat as number)
      ) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized",
          error: {
            message: "Your password has been changed, please login again",
          },
        });
      }

      //set userId & email to headers
      req.headers.userId = decoded.userId;
      req.headers.email = decoded.email;
      req.headers.role = decoded.role;

      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: "You are not authorized",
        error: {
          message: err.message
        }
      });
    }
  };
};

export default AuthMiddleware;