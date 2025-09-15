// const nanoid = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ error: 'redirectURL is required' });
    }
    const shortId = Math.random().toString(36).substring(2, 8);
    const newURL = new URL({
        shortId,
        redirectURL: body.redirectURL,
        visitHistory:[],
        createdBy: req.user._id
    });
    try {
        const savedURL = await newURL.save();
        res.render('home', { id: savedURL.shortId });
        // res.status(201).json(savedURL);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save URL' });
    }    
}

const handleGetAllURLs = async (req, res) => { 
    try {
        const urls = await URL.find({});
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
}


const handleNavigateToShortURL = async (req, res) => {
    const shortId = req.params.id;
    try {
        const urlEntry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),
                        userAgent: req.get('User-Agent'),
                        ipAddress: req.ip
                    }
                }
            },
            { new: true }
        );
        if (urlEntry) {
            res.redirect(urlEntry.redirectURL);
        } else {
            res.status(404).json({ error: 'Short URL not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to navigate to short URL' });
    }
}

async function handleGetAnalytic(req,res) {
    const shortId =  req.params.id;
    const result = await URL.findOne({ shortId });
    if (result) {
        res.status(200).json({
            totalClicks: result.visitHistory.length,
            visitHistory: result.visitHistory
        });
    } else {
        res.status(404).json({ error: 'Short URL not found' });
    }
}

async function handleDeleteAllURLs(req, res) {
    try {
        await URL.deleteMany({});
        res.status(200).json({ message: 'All URLs deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete URLs' });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAllURLs,
    handleNavigateToShortURL,
    handleGetAnalytic,
    handleDeleteAllURLs
};