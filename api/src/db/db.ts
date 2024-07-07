import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

dotenv.config();

let gfs: GridFSBucket | undefined;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL as string);
        console.log('MongoDB Connected');
        // @ts-ignore
        gfs = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
        console.log('GridFSBucket Initialized');
    } catch (err) {
        console.error('Error connecting to MongoDB:');
    }
};

export { connectDB, gfs };
