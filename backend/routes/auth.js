const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, location, userType } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            location,
            userType
        });

        await user.save();

        const payload = {
            user: {
                id: user.id,
                userType: user.userType
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: "Server error"});
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                userType: user.userType
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
