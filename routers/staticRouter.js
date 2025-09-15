const express = require('express');
const URL = require('../models/url');

const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user) return res.render('login')
    const urlList = await URL.find({createdBy: req.user._id});
   await res.render('home',{
    urlList: urlList
   });
});

router.get('/register', (req, res) => { 
    return res.render('register');
})

router.get('/login', (req, res) => { 
    return res.render('login');
})

module.exports = router;