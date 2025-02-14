import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import mongoose, { mongo } from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser())
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5889;

app.use('/api',userRoutes)

const server = app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

mongoose.connect('mongodb://localhost:27017/Toposel').then(()=>{
    console.log('Database connected');
});