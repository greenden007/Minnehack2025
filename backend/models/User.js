const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: Number, required: true },
    volunteerHours: { type: Number, default: 0 },
    completedOpportunities: { type: Number, default: 0 },
    plannedOpportunities: { type: Number, default: 0 },
    userType: { type: String, enum: ['citizen', 'government'], default: 'citizen' },
    createdAt: { type: Date, default: Date.now },
});

userSchema.statics.getLeaderboardByLocation = async function(location) {
    const users = await this.find({ location, userType: 'citizen' })
    .sort({ volunteerHours: -1 })
    .limit(10);
    return users;
};

userSchema.statics.updateEmail = async function(userId, newEmail) {
    try {
        return await User.findByIdAndUpdate(userId, { email: newEmail }, { new: true });
    } catch (err) {
        console.log(err);
    }
};

userSchema.statics.updatePassword = async function(userId, newPassword) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json('User not found');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await user.save();
        return;
    } catch (err) {
        console.log(err);
    }
};

userSchema.statics.updateLocation = async function(userId, newLocation) {
    try {
        return await User.findByIdAndUpdate(userId, { location: newLocation }, { new: true });
    } catch (err) {
        console.log(err);
    }
};


module.exports = mongoose.model('User', userSchema);
