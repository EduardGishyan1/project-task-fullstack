import {nanoid} from "nanoid";

const gen_unique_id = async () => {
    const uniqueId = nanoid(6);
    return uniqueId
}

export default gen_unique_id