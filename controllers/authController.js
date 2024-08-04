import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, phone, email, password } = req.body;

    try {
          
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, phone, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.json({ msg: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export const getUserDetails = async (req, res) => {
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({
            username: user.username,
            phone: user.phone
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};