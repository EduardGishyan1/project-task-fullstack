import express from "express"
import productController from "../controllers/productController.js"
import checkToken from "../middlewares/checkToken.js"

const productRouter = express.Router()

productRouter.post("/",productController.createProduct)
productRouter.get("/",productController.getProducts)
productRouter.get("/:id",productController.getProductByID)
productRouter.put("/:id",productController.updateProduct)
productRouter.delete("/:id",productController.deleteProduct)

export default productRouter