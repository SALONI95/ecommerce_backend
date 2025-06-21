import { ApiError } from "../utils/apiError.js";
import redis from "redis";
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// const connectRedis = () => {
//   try {
//     return redisClient.connect();
//   } catch (error) {
//     throw new ApiError(500, "problem occured while connecting to redis");
//   }
// };
export default redisClient;
