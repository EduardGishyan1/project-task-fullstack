import ROLES from "../utils/roles.js"
import HTTP_STATUS from "../utils/status_code.js"
import dotenv from "dotenv"

dotenv.config()

const IsAdmin = async (req,res,next) => {
    const current_user = req.user
    const current_user_role = current_user.role

    if (current_user_role != ROLES.admin){
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({"message":"You have not permission"})
    }

    next()
}

export default IsAdmin