const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const User = require('../models/User');

// Create a new event
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, location, date, startTime, endTime, maxParticipants, category, hoursWorth } = req.body;
        
        const event = new Event({
            title,
            description,
            location,
            date,
            startTime,
            endTime,
            maxParticipants,
            category,
            hoursWorth,
            creator: req.user.id,
            participants: [req.user.id] // Creator is automatically a participant
        });

        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get all events
router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName'])
            .sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName']);
        
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        
        res.json(event);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

// Join an event
router.post('/:id/join', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if event is full
        if (event.participants.length >= event.maxParticipants) {
            return res.status(400).json({ msg: 'Event is full' });
        }

        // Check if user is already a participant
        if (event.participants.includes(req.user.id)) {
            return res.status(400).json({ msg: 'Already joined this event' });
        }

        event.participants.push(req.user.id);
        await event.save();

        const updatedEvent = await Event.findById(req.params.id)
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName']);

        res.json(updatedEvent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Leave an event
router.post('/:id/leave', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Check if user is a participant
        if (!event.participants.includes(req.user.id)) {
            return res.status(400).json({ msg: 'Not a participant of this event' });
        }

        // Remove user from participants
        event.participants = event.participants.filter(
            participant => participant.toString() !== req.user.id
        );

        await event.save();

        const updatedEvent = await Event.findById(req.params.id)
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName']);

        res.json(updatedEvent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update event status (creator only)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // Verify that the user is the creator
        if (event.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const { status } = req.body;
        
        // Validate status
        if (!['upcoming', 'ongoing', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ msg: 'Invalid status' });
        }

        // If event is marked as completed, add volunteer hours to participants
        if (status === 'completed') {
            const participants = await User.find({ _id: { $in: event.participants } });
            for (let participant of participants) {
                participant.volunteerHours += event.hoursWorth;
                await participant.save();
            }
        }

        event.status = status;
        await event.save();

        const updatedEvent = await Event.findById(req.params.id)
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName']);

        res.json(updatedEvent);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
