import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../', process.env.NODE_ENV + '.env'),
});

const getConfig = () => {
    return {
        PORT: process.env.PORT || '3001',
        MONGO_HOST: process.env.MONGO_HOST || 'localhost',
        MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/MyTaskApp',
        MONGO_USERNAME: process.env.MONGO_USERNAME || 'test',
        MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'test',
        MONGO_DATABASE: process.env.MONGO_DATABASE || 'MyTaskApp',
        TOKEN_SECRET: process.env.TOKEN_SECRET || 'groovyTaskApp',
        ENV: process.env.ENV || 'dev',
    };
};

export default getConfig;
