const express = require('express');
const  { handleGenerateNewShortURL,handleGetAllURLs, handleNavigateToShortURL, handleGetAnalytic} = require('../controllers/url');
const router = express.Router();
const URL = require('../models/url');

// GET all URLs
router.get('/', handleGetAllURLs)

// POST a new URL to shorten
router.post('/',handleGenerateNewShortURL)

// Export the router
router.get('/:id', handleNavigateToShortURL)

// GET analytics for a specific short URL
router.get('/:id/analytics', handleGetAnalytic )


module.exports = router;