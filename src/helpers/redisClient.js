import redis from 'redis';

const redisClient = redis.createClient({
    url: 'redis://localhost:6379',
});

redisClient
    .connect()
    // eslint-disable-next-line no-console
    .then(() => console.log('Connected to Redis'))
    // eslint-disable-next-line no-console
    .catch((error) => console.error('Error connecting to Redis:', error));

export default redisClient;
