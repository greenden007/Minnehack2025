const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/leaderboard', async (req, res) => {
    try{
        const leaderboard = await User.getLeaderboardByLocation(req.user.location);
        res.json(leaderboard);
    } catch (err) {
        res.status(500).send('Server Error');
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


module.exports = router;