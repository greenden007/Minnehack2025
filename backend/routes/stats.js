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

module.exports = router;