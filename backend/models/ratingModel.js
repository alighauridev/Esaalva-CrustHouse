const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;