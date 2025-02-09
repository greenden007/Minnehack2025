const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/leaderboard', async (req, res) => {
    try{
        const leaderboard = await User.getLeaderboardByLocation(req.user.location);
        return res.status(200).json(leaderboard);
    } catch (err) {
        return res.status(500).send('Server Error');
    }
});

router.put('/update-email', auth, async(req, res)=> {
    const { userId, newEmail } = req.body;

    if (!userId || !newEmail) {
        return res.status(400).send({ message: "User ID and new email are required" });
    }

    try {
        const result = await User.updateEmail(userId, newEmail);
        return res.status(200).json({ message: "Email updated" });
    } catch (err) {
        return res.status(500).send({ message: "Server error" });
    }
});

router.put('/update-password', auth, async (req, res) => {
    const { userId, newPassword } = req.body;

    if (!userId || !newPassword) {
        return res.status(400).send({ message: "User ID and new password are required" });
    }

    try {
        const result = await User.updatePassword(userId, newPassword);
        return res.status(200).json({ message: "Password updated" });
    } catch (err) {
        return res.status(500).send({ message: "Server error" });
    }
});

router.put('/update-location', auth, async (req, res) => {
    const { userId, newLocation } = req.body;

    if (!userId || !newLocation) {
        return res.status(400).send({ message: "User ID and new location are required" });
    }

    try {
        const result = await User.updateLocation(userId, newLocation);
        return res.status(200).json({ message: "Location updated" });
    } catch (err) {
        return res.status(500).send({ message: "Server error" });
    }
});

// Update age
router.put('/update-age', auth, async (req, res) => {
    const { userId, newAge } = req.body;

    if (!userId || !newAge) {
        return res.status(400).send({ message: "User ID and new age are required" });
    }

    try {
        const result = await User.updateAge(userId, newAge);
        return res.status(200).json({ message: "Age updated" });
    } catch (err) {
        return res.status(500).send({ message: "Server error" });
    }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).send({ message: "Server error" });
    }
});


module.exports = router;