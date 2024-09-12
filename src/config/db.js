import mongoose from 'mongoose';
import 'dotenv/config';
import getConfig from './config.js';

const connectDB = async () => {
    try {
        const db = getConfig(process.env.NODE_ENV);
        const host = db.MONGO_HOST;
        const username = db.MONGO_USERNAME;
        const password = db.MONGO_PASSWORD;
        const database = db.MONGO_DATABASE;
        let dbUrl = '';

        if (process.env.NODE_ENV === 'development') {
            // mongodb atlas url
            dbUrl = `mongodb+srv://${username}:${encodeURIComponent(
                password
            )}@mytaskapp.mkve0.mongodb.net/?retryWrites=true&w=majority&appName=${database}`;
        } else {
            // local url
            dbUrl = `mongodb://${username}:${encodeURIComponent(password)}@${host}:27017/${database}`;
        }
        mongoose.set('strictQuery', false);
        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        process.exit(-1);
    }
};

export default connectDB;
