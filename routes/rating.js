import express from 'express';
import Rating from '../models/Rating.js';

const router = express.Router();

// Submit a rating
router.post('/', async (req, res) => {
    const { username, rating } = req.body;

    if (!username || rating == null || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Invalid rating data' });
    }

    try {
        const newRating = new Rating({ username, rating });
        await newRating.save();
        res.status(201).json(newRating);
    } catch (error) {
        res.status(500).json({ message: 'Error saving rating', error });
    }
});

// Get ratings for a user
router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const ratings = await Rating.find({ username });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ratings', error });
    }
});

export default router;
