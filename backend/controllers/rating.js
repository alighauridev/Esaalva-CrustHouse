const Rating = require('../models/rating');

// Add a new rating
const addRating = async (req, res) => {
    try {
        const { user, rating, comment } = req.body;

        const newRating = new Rating({ user, rating, comment });
        await newRating.save();

        res.status(201).json({ success: true, message: 'Rating added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to add rating' });
    }
};

// Get all ratings
const getAllRatings = async (req, res) => {
    try {
        const ratings = await Rating.find().populate('user', 'name email');

        res.status(200).json({ success: true, ratings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to get ratings' });
    }
};

module.exports = { addRating, getAllRatings };
