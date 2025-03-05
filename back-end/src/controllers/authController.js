import User from "../models/userModel.js"
import authService from "../services/authService.js"
import { redis_connection } from "../config/redisDB.js"
import jwt from "jsonwebtoken"
import HTTP_STATUS from "../utils/status_code.js"


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

        const { access_token, unique_id } = await authService.loginUser(email, password);


        return res.status(HTTP_STATUS.OK).json({ access_token, unique_id })

    } catch (error) {
        return res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message || "An error occurred during login" });
    }
}

const logoutUser = async (req, res) => {
    try {
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
    catch {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Please try again later.",
        });
    }
}

const refreshToken = async (req, res) => {
    const refresh_token_code = req.headers["refresh-token"];

    if (!refresh_token_code) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "No refresh token provided" });
    }

    try {
        const refresh_token = await redis_connection.get(refresh_token_code);

        if (!refresh_token) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid or expired refresh token" });
        }

        const user_data = jwt.verify(refresh_token, process.env.JWT_SECRET);

        if (!user_data || !user_data.userId || !user_data.role) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Invalid refresh token" });
        }

        const new_access_token = jwt.sign(
            { userId: String(user_data.userId), role: String(user_data.role) },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', new_access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 3600000),
        });


        res.status(HTTP_STATUS.OK).json({ accessToken: new_access_token });
    } catch (error) {
        console.error("Error refreshing token:", error);
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Session expired. Please log in again." });
    }
}


export default { registerUser, loginUser, logoutUser, refreshToken }