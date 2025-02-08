const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    volunteerHours: { type: Number, default: 0 },
    userType: { type: String, enum: ['citizen', 'government'], default: 'citizen' },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', userSchema);
