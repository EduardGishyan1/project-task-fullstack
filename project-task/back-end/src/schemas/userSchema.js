import mongoose from "mongoose"
import ROLES from "../utils/roles.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ROLES.user,ROLES.admin],
        default: ROLES.admin
    }
})

export default userSchema