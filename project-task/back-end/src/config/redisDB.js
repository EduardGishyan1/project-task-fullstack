import { createClient } from "redis";

const redis_connection = createClient({
    url: "redis://localhost:6379"
})

const connectRedis = async () => {
    try {
        await redis_connection.connect()
        console.log("Redis connected")
    } catch (err) {
        console.error("Redis connection error:", err)

        setTimeout(() => connectRedis(), 5000)
    }
};

export {connectRedis,redis_connection}