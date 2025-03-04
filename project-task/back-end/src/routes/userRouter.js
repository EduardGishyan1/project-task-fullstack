import checkToken from "../middlewares/checkToken.js"
import express from "express"
import userController from "../controllers/userController.js"
import IsAdmin from "../middlewares/checkRole.js"

const userRouter = express.Router()

userRouter.use(checkToken)

userRouter.get("/", IsAdmin,userController.seeUsers)
userRouter.get("/:id",IsAdmin,userController.seeUserByID)
userRouter.get("/profile/me",userController.getUserProfile)
userRouter.put("/profile/me",userController.updateUserProfile)
userRouter.delete("/profile/me",userController.deleteUserProfile)
userRouter.delete("/:id",IsAdmin,userController.deleteUserById)
userRouter.put("/:id",IsAdmin,userController.updateUserById)

export default userRouter
