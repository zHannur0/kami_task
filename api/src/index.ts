import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRouter from './routes/product';
import dotenv from 'dotenv';
import {connectDB}from "./db/db";

dotenv.config();

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

connectDB()

app.use('/api/products', productsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
