import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Update user details
router.put('/update', async (req, res) => {
    const { username, field, value } = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { [field]: value },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
