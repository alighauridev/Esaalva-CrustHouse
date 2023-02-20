const express = require('express');
const router = express.Router();
const { addRating, getAllRatings } = require('../controllers/rating.controller');

// Add a new rating
router.post('/', addRating);

// Get all ratings
router.get('/', getAllRatings);

module.exports = router;
