import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { TUserRole } from '../interfaces/user.interface';

export type TExpiresIn = number | `${number}${'s' | 'm' | 'h' | 'd'}`


type TPayload = {
    userId: string;
    email: string;
    fullName: string;
    profileImg?: string;
    role: TUserRole
}

const createToken = (payload: TPayload, secretKey: Secret, expiresIn: TExpiresIn) => {
    const options: SignOptions = {
        algorithm: "HS256",
        expiresIn, // This can be a number (e.g., 3600) or a string (e.g., "1h")
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
};

 export default createToken;