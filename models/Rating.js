import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
