import mongoose from "mongoose"

const is_valid_id = async (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

export default is_valid_id