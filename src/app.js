/* eslint-disable no-case-declarations */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Adds security headers to protect the app from common web vulnerabilities
import mongoSanitize from 'express-mongo-sanitize'; // Prevents NoSQL injection attacks by sanitizing user input in MongoDB queries
import rateLimit from 'express-rate-limit'; // Limits repeated requests to public APIs to prevent abuse and DDoS attacks
import xss from 'xss-clean'; // Sanitizes user input to prevent Cross-Site Scripting (XSS) attacks
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import taskRouter from './routes/tasks.routes.js';
const app = express();

connectDB()
    // eslint-disable-next-line no-console
    .then(() => console.log('MongoDB is connected'))
    // eslint-disable-next-line no-console
    .catch((err) => console.error('MongoDB connection error:', err));

// Configure rate limiting middleware
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    // eslint-disable-next-line no-console
    message: {
        status: 429,
        message: 'Opps !! Too many requests, please try again later.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// CORS Configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions)); // Use CORS middleware with specific options
app.use(express.json({ limit: '20kb' })); // we can restrict the size of the JSON payload
app.use(express.urlencoded({ extended: false, limit: '50kb' })); // Limit URL-encoded data size

// Security Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// Rate Limiting Middleware
app.use(limiter);

app.use('/user', userRouter);
app.use('/tasks', taskRouter);

export default app;
