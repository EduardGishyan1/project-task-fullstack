import User from "../models/userModel.js"

const unused_fields = "-__v -password"

const allUsers = async () => {
    try{
        const users = await User.find().select(unused_fields)
        return users
    }
    catch{
        throw new Error("error while fetching users")
    }
}

const getUserByID = async (user_id) => {
    try{
        const user = await User.findOne({_id:user_id}).select(unused_fields)
        return user
    }
    catch{
        throw new Error("something went wrong while fetching user")
    }
}

const deleteUserByID = async (user_id) => {
    try{
        const user = await User.deleteOne({_id:user_id})
        return user
    }
    catch{
        throw new Error("something went wrong while deleting user")
    }
}

const updateUserByID = async (user_id,user_data) => {
    const updated_data = await User.findByIdAndUpdate(user_id,user_data,{new:true}).select(unused_fields)
    return updated_data
}

export default {allUsers,getUserByID,deleteUserByID,updateUserByID}