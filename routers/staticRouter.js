const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    const urlList = await URL.find({});
   await res.render('home',{
    urlList: urlList
   });
});

module.exports = router;