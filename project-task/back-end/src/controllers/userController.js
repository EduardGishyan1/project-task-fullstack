import userService from "../services/userService.js"
import HTTP_STATUS from "../utils/status_code.js"
import is_valid_id from "../utils/id_validation.js"

const seeUsers = async (req,res) => {
    try{
        const users = await userService.allUsers()
        return res.status(HTTP_STATUS.OK).json(users)
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const seeUserByID = async (req,res) => {
    try{
        const {id} = req.params
        const is_valid = await is_valid_id(id)
        if (!is_valid){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid user ID" });
        }
        const user = await userService.getUserByID(id)
        if (!user){
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "User not found" });
        }
        return res.status(HTTP_STATUS.OK).json(user)
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const deleteUserById = async (req,res) => {
    try{
        const {id} = req.params
        
        const is_valid = await is_valid_id(id)
        if (!is_valid){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid user ID" });
        }
        
        const deleted_user = await userService.deleteUserByID(id)
        if (!deleted_user.deletedCount){
            return res.status(HTTP_STATUS.NOT_FOUND).json({'message':"User not found"})
        }
        return res.status(HTTP_STATUS.OK).json({"message":`User deleted successfully with id ${id}`})
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const updateUserById = async (req,res) => {
    try{
    const {id} = req.params
    
    const is_valid = await is_valid_id(id)
        if (!is_valid){
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid user ID" });
        }
    
    const user_data = req.body
    const updated_data = await userService.updateUserByID(id,user_data)
    if (!updated_data){
        return res.status(HTTP_STATUS.NOT_FOUND).json({message:"User not found"})
    }
    return res.status(HTTP_STATUS.OK).json(updated_data)
    
}
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const getUserProfile = async (req,res) => {
    try{
        const current_user = req.user
        const current_user_id = current_user.userId
        const current_user_profile = await userService.getUserByID(current_user_id)
        return res.status(HTTP_STATUS.OK).json(current_user_profile)
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}


const updateUserProfile = async (req,res) => {
    try{
    const current_user = req.user
    const user_data = req.body
    
    if (user_data.role){
        return res.status(HTTP_STATUS.FORBIDDEN).json({message:"You can not change your role"})
    }
    const current_user_id = current_user.userId

    const updated_user_profile = await userService.updateUserByID(current_user_id,user_data)

    return res.status(HTTP_STATUS.OK).json(updated_user_profile)
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const deleteUserProfile = async (req,res) => {
    try{
        const current_user = req.user
        const current_user_id = current_user.userId

        const deleted_user = await userService.deleteUserByID(current_user_id)
        if (!deleted_user.deletedCount){
        return res.status(HTTP_STATUS.NOT_FOUND).json({'message':"User not found"})
        }
        
        res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
        res.clearCookie("refresh-token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });

        return res.status(HTTP_STATUS.OK).json({"message":"Your account deleted successfully"})
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export default {seeUsers,seeUserByID,deleteUserById,updateUserById,getUserProfile,updateUserProfile,deleteUserProfile}