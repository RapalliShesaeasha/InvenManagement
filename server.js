import express from 'express';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/product.js';
import componentRoutes from './routes/component.js';
import uploadRoutes from './routes/upload.js';
import updateUserRoutes from './routes/updateUser.js'; // Import the new route
import ratingRoutes from './routes/rating.js'; // Import the rating routes


dotenv.config();

const app = express();

connectDB();

app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/uploads', uploadRoutes); // Add the new route
app.use('/api/users', updateUserRoutes); // Add the new route
app.use('/api/ratings', ratingRoutes); // Add the rating routes

// Add a test route
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
