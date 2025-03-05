import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value > 0
            },
            message: 'Price must be greater than 0'
        }
    },
    stock: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0
            },
            message: 'Price must be greater than or === 0'
        }
    },
    category: {
        type: String
    }
})

export default productSchema;