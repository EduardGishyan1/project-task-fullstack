import HTTP_STATUS from "../utils/status_code.js"
import User from "../models/userModel.js"
import authService from "../services/authService.js"
import { redis_connection } from "../config/redisDB.js"

const registerUser = async (req, res) => {
    try {
        const { name, surname, email, password } = req.body
        
        if (!name || !email || !password) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Enter required fields for register" })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(HTTP_STATUS.CONFLICT).json({ message: "Email already in use" });
        }

        await authService.registerUser(name, surname, email, password);

        res.status(HTTP_STATUS.CREATED).json({ message: "Registered successfully" });
    }
    catch {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Failed to process request" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Email and password are required" });
        }

        const {access_token,unique_id} = await authService.loginUser(email, password);

        return res.status(HTTP_STATUS.OK).json({access_token,unique_id})
    
    } catch (error) {
        return res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message || "An error occurred during login" });
    }
}
    
const logoutUser = async (req,res) => {
    try{
        const unique_id = req.cookies['refresh-token']

        res.clearCookie("token", { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',  
        });

        res.clearCookie("refresh-token", { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict',
        });

        if (unique_id) {
            await redis_connection.del(unique_id);
        }

        res.status(HTTP_STATUS.OK).json({ message: "Logged out successfully" });
    }
    catch{
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Please try again later.",
        });
    }
}

export default { registerUser, loginUser, logoutUser }