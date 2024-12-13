import { createClient} from 'redis';


class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => {
      console.log(`Redis Client Error: ${err.message}`);
    });

    this.client.connect().catch((err) => {
      console.log(`Failed to connect to Redis: ${err.message}`);
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error(`Error getting key "${key}": ${err.message}`);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.set(key, value, {
        EX: duration,
      });
    } catch (err) {
      console.error(`Error setting key "${key}": ${err.message}`);
    }
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
       console.error(`Error deleting key "${key}": ${err.message}`);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
