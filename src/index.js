import app from './app.js';
import 'dotenv/config';
import getConfig from './config/config.js';

const port = getConfig(process.env.NODE_ENV);

app.listen(port.PORT, () => true);

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = '400';
    err.statusCode = 404;
    next(err);
});

// eslint-disable-next-line no-unused-vars
app.use(async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 400;
    
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

