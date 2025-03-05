import mongoose from "mongoose";
import productSchema from "../schemas/productSchema.js"

const Product = mongoose.model("Products",productSchema)

export default Product