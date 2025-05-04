import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

// express
const app = express();

// connect db
connectDB();

// Middlewares
app.use(cors());

// Route
app.get('/', (req, res) => {res.send('Api working')})

app.post('/clerk', express.json(), clerkWebhooks)



// Port
const PORT = process.env.PORT || 5000;

// Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})