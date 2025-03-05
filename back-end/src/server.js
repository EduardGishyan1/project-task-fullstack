import dotenv from "dotenv"

import app from "./app.js"
import connectMongo from "./config/mongoDB.js"
import {connectRedis}  from "./config/redisDB.js"

dotenv.config()

const port = process.env.PORT

const StartServer = async () => {
    await connectMongo()
    await connectRedis()

    app.listen(port, async () => {
        console.log(`Server is running on port ${port}`)
    })
}

StartServer()