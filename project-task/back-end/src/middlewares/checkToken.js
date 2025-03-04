import HTTP_STATUS from "../utils/status_code.js";
import jwt from "jsonwebtoken"
import { redis_connection } from "../config/redisDB.js";

import dotenv from "dotenv"

dotenv.config()

const checkToken = async (req,res,next) => {
    let token = req.cookie
    
    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Not authorizied' });
    }
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        const refresh_token_code = req.cookies["refresh-token"]
        if (!refresh_token_code){
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({message:"Please login again"})
        }
        try{
            const refresh_token = await redis_connection.get(refresh_token_code)
            if (!refresh_token) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Session expired log in again" });
            }

            const user_data = jwt.verify(refresh_token, process.env.JWT_SECRET);
            
            if (!user_data || !user_data.userId || !user_data.role) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid refresh token. Please log in again." });
            }

            const access_token = jwt.sign({ userId: String(user_data.userId), role: String(user_data.role) }, process.env.JWT_SECRET, { expiresIn: '1m' });

            res.cookie('token', access_token, {
                httpOnly: true,  
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 3600000),
            });
            req.user = { userId: user_data.userId, role: user_data.role }
            next();
        }
        catch{
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Session expired. Please log in again." });
        }  
    }
}

export default checkToken