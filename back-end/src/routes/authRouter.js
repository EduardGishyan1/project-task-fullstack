import express from "express"
import authController from "../controllers/authController.js"
import checkToken from "../middlewares/checkToken.js"

const authRouter = express.Router()
authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true })); 

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)
authRouter.get("/logout", checkToken, authController.logoutUser)
authRouter.post("/refresh", authController.refreshToken)
   

export default authRouter