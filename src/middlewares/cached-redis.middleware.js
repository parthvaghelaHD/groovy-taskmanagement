import redisClient from '../helpers/redisClient.js';

// Middleware to check Redis cache
export const cacheMiddleware = async (req, res, next) => {
    const { _id } = req.user;

    try {
        // Check if data exists in the cache
        const cachedTasks = await redisClient.get(`tasks:${_id}`);

        if (cachedTasks) {
            return res.status(200).json(JSON.parse(cachedTasks));
        }

        next();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error checking cache:', error);
        next();
    }
};
