import dotenv from 'dotenv';

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from '../models/userModel.js';
import gen_unique_id from "../utils/unique_id.js"
import { redis_connection } from '../config/redisDB.js';
import HTTP_STATUS from '../utils/status_code.js';

dotenv.config()

const registerUser = async (name, surname, email, password) => {
    try{
        const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS)

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

        const newUser = new User({
            name,
            surname,
            email,
            password: hashedPassword,
        })

        await newUser.save()
    }
    catch{
        throw new Error("User registration failed");
    }
}

const loginUser = async (email, password) => {
    try {

        const user = await User.findOne({ email })
        if (!user) {
            throw { status: HTTP_STATUS.NOT_FOUND, message: "User not found" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw { status: HTTP_STATUS.BAD_REQUEST, message: "Invalid password" };
        }

        const access_token = jwt.sign({ userId: String(user._id), role: String(user.role) }, process.env.JWT_SECRET, { expiresIn: '1m' });
        const refresh_token = jwt.sign({ userId: String(user._id), role: String(user.role) }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const unique_id = await gen_unique_id()

        await redis_connection.set(unique_id,refresh_token)

        return {access_token,unique_id}
    }
    catch {
        throw {status: HTTP_STATUS.INTERNAL_SERVER_ERROR,message: "Login failed"}
    }
}

export default { registerUser, loginUser }