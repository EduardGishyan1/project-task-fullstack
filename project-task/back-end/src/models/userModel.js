import mongoose from "mongoose"
import userSchema from "../schemas/userSchema.js"

const User = mongoose.model('Users',userSchema)

export default User