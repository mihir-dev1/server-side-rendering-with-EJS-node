const User = require('../models/user');
// const {v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../services/auth')
// Example controller function for user registration

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        await User.create({ username, password, email });
        // await newUser.save();
        return res.render('home');
        // res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }   
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }   
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            setUser(sessionId, user);
            res.cookie('sessionId', sessionId, { httpOnly: true });
            return res.render('home');  
            // res.status(200).json({ message: 'Login successful' });
        } else {
            return res.render('login');
            // res.status(401).json({ error: 'Invalid credentials' });
        }   
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }   
};

module.exports = {
    registerUser,
    handleLogin
};