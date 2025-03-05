import express from "express"
import productController from "../controllers/productController.js"
import checkToken from "../middlewares/checkToken.js"

const productRouter = express.Router()

productRouter.post("/",checkToken,productController.createProduct)
productRouter.get("/",checkToken,productController.getProducts)
productRouter.get("/:id",checkToken,productController.getProductByID)
productRouter.put("/:id",checkToken,productController.updateProduct)
productRouter.delete("/:id",checkToken,productController.deleteProduct)

export default productRouter