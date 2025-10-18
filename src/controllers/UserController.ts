import { Request, Response } from "express";

export class UserController {

    //getMyProfile
    static getProfile = (req: Request, res: Response) => {
        try{
            res.status(200).json({ success: true, message: "This is Get Profile" })
        }
        catch{
           res.status(500).json({ success: false, message: "This is Get Profile" })
        }
    }


}


