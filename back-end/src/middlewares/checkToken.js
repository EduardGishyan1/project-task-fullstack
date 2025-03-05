import HTTP_STATUS from "../utils/status_code.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Authorization token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  
        next();  

    } catch (error) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "Invalid or expired token. Please log in again." });
    }
};

export default checkToken;