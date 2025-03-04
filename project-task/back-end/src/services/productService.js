import Product from "../models/productModel.js"

const unused_fields = "-__v"

const newProduct = async (name,price,description,stock,category) => {
    try{
        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            category
        })

        const savedproduct = await newProduct.save()
        return savedproduct
    }
    catch{
        throw new Error("Error creating the product");
    }
}

const allProducts = async () => {
    try{
        const products = await Product.find({}).select(unused_fields)
        return products
    }
    catch{
        throw new Error("Error fetching products");
    }
}

const getProductByID = async (product_id) => {
    try{
        const product = await Product.findOne({_id:product_id}).select(unused_fields)
        return product
    }
    catch{
        throw new Error("Something went wrong")
    }
}

const updateProductByID = async (product_id,update_data) => {
    try{
        const product = await Product.findByIdAndUpdate(product_id,update_data,{new:true}).select(unused_fields)
        return product
    }
    catch{
        throw new Error("Something went wrong")
    }
}

const deleteProductByID = async (product_id) => {
    try{
        const deleted_product = await Product.deleteOne({_id:product_id})
    
        return deleted_product
    }
    catch{
        throw new Error("Something went wrong while deleting product")
    }
}

export default {newProduct,allProducts,getProductByID,updateProductByID,deleteProductByID}