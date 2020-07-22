import Redis from "ioredis";
import config from "../../config/config";
const newRedis = new Redis(config.redis);
export default newRedis;
