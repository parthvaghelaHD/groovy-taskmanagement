import 'dotenv/config';
import jwt from 'jsonwebtoken';
import getConfig from '../config/config.js';
import AppError from '../helpers/AppError.js'; // Import AppError

const secret = getConfig(process.env.NODE_ENV);

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError('Access token is missing in the request header.', 401));
    }

    jwt.verify(token, secret.TOKEN_SECRET || 'groovyTaskApp', (err, user) => {
        if (err) {
            return next(new AppError('Invalid or expired access token.', 403));
        }
        req.user = user;
        next();
    });
};

const generateAccessToken = (...data) => jwt.sign(...data, secret.TOKEN_SECRET, { expiresIn: '8h' });
// Attach unless to the JWT middleware

export { authenticateToken, generateAccessToken };
