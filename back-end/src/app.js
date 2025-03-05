import express from "express"
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRouter.js"
import userRouter from './routes/userRouter.js'
import cookieParser from "cookie-parser"

const app = express()

import cors from "cors"


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization',"refresh-token"],  // Allow Authorization header

}));

app.use(express.json());

app.use(cookieParser())

app.use("/auth",authRouter);
app.use("/products",productRouter)
app.use("/users",userRouter)

export default app