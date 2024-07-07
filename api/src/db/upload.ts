import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGO_DB_URL as string,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads',
            };
            resolve(fileInfo);
        });
    },
});

const upload = multer({ storage });

export { upload };
