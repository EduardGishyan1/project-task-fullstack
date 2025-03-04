import checkToken from "../middlewares/checkToken.js"
import express from "express"
import userController from "../controllers/userController.js"
import IsAdmin from "../middlewares/checkRole.js"

const userRouter = express.Router()

userRouter.get("/", userController.seeUsers)
userRouter.get("/:id",userController.seeUserByID)
userRouter.get("/profile/me",userController.getUserProfile)
userRouter.put("/profile/me",userController.updateUserProfile)
userRouter.delete("/profile/me",userController.deleteUserProfile)
userRouter.delete("/:id",userController.deleteUserById)
userRouter.put("/:id",userController.updateUserById)

export default userRouter