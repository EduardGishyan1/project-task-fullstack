import express from "express"
import productController from "../controllers/productController.js"
import checkToken from "../middlewares/checkToken.js"

const productRouter = express.Router()

productRouter.post("/",checkToken,productController.createProduct)
productRouter.get("/",productController.getProducts)
productRouter.get("/:id",productController.getProductByID)
productRouter.put("/:id",checkToken,productController.updateProduct)
productRouter.delete("/:id",checkToken,productController.deleteProduct)

export default productRouter
