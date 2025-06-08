import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

// custom imports
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // if using cookies or sessions
}));

// middleware 
app.use(express.json())
app.use(morgan("dev"))

// root apis
// database connection
connectDB();


// app.get('/', (req,res) =>{
//     res.send('Hello World');
// })

app.use('/api/auth',authRoutes)

app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
