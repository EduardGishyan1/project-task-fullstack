import dotenv from "dotenv"

dotenv.config()

import mongoose from "mongoose"

const mongoURI = process.env.MONGO_URI

const connectDB = async () => {
    try{
        await mongoose.connect(mongoURI)
        console.log("mongoDB connected")
    }
    catch (error){
        console.log("Error connecting to MongoDB",error.message)
    }
}

export default connectDB