import is_valid_id from "../utils/id_validation.js"
import productService from "../services/productService.js"
import HTTP_STATUS from "../utils/status_code.js"

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body
        if (!name || !price || !stock || !category) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                "message": "Please enter required fields"
            })
        }

        await productService.newProduct(name, price, description, stock, category)

        return res.status(HTTP_STATUS.CREATED).json({ "message": "Product created successfully" })
    }
    catch(error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ "message": error.message })
    }
}

const getProducts = async (req,res) => {
    try{
        const products = await productService.allProducts()
        return res.status(HTTP_STATUS.OK).json(products); 
    }
    catch(error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
}

const getProductByID = async (req,res) => {
    try{
        const { id } = req.params
        const is_valid = await is_valid_id(id)
        if (!is_valid) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({"message":"Invalid Product ID"});
        }
        const product = await productService.getProductByID(id)
        if (!product){
            return res.status(HTTP_STATUS.NOT_FOUND).json({"message":"Product not found"})
        }
        return res.status(HTTP_STATUS.OK).json(product) 
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({"message": error.message})
    }
}

const updateProduct = async (req,res) => {
    try{
        const update_data = req.body
        const {id} = req.params
        
        const is_valid = await is_valid_id(id)
        if (!is_valid) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({"message":"Invalid Product ID"});
        }

        const updated_product = await productService.updateProductByID(id,update_data)
        if (!updated_product){
            return res.status(HTTP_STATUS.NOT_FOUND).json({"message":"Product not found"})
        }
        return res.status(HTTP_STATUS.OK).json(updated_product)
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({"message": error.message})
    }
}

const deleteProduct = async (req,res) => {
    try{
        const {id} = req.params
        const is_valid = await is_valid_id(id)
        if (!is_valid) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({"message":"Invalid Product ID"});
        }

        const deleted_product = await productService.deleteProductByID(id)
        if (!deleted_product.deletedCount){
            return res.status(HTTP_STATUS.NOT_FOUND).json({"message":"Product not found"})
        }
        return res.status(HTTP_STATUS.OK).json({"message":"Product deleted successfully"})
    }
    catch (error){
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({"message": error.message})
    }
}

export default { createProduct, getProducts, getProductByID,updateProduct,deleteProduct }