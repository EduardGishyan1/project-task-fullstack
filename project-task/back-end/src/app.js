import express from "express"
import authRouter from "./routes/authRouter.js"
import productRouter from "./routes/productRouter.js"
import userRouter from './routes/userRouter.js'
import cookieParser from "cookie-parser"


const app = express()

import cors from "cors"

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})


app.use(express.json());

app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); 

app.use("/auth",authRouter);
app.use("/products",productRouter)
app.use("/users",userRouter)

export default app