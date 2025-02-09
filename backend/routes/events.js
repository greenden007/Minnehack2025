const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const User = require('../models/User');
const { Client } = require("@googlemaps/google-maps-services-js");

const googleMapsClient = new Client({});

// Create a new event
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, location, date, startTime, duration, maxParticipants, minAge } = req.body;
        
        // Geocode the location
        try {
            const response = await googleMapsClient.geocode({
                params: {
                    address: location,
                    key: process.env.GOOGLE_MAPS_API_KEY
                }
            });

            if (response.data.results.length === 0) {
                return res.status(400).json({ msg: 'Invalid location' });
            }
            
            const event = new Event({
                title,
                description,
                location,
                date,
                startTime,
                endTime,
                maxParticipants,
                hoursWorth: duration,
                minAge: minAge,
                creator: req.user.id,
                participants: [req.user.id]
            });

            await event.save();
            res.json(event);
        } catch (error) {
            console.error('Geocoding error:', error);
            return res.status(400).json({ msg: 'Error processing location' });
        }
        
        User.findById(req.user.id).then(user => {
            if (!user) {
                return console.error("User not found");
            }
        
            user.volunteerHours += duration; 
            user.plannedOpportunities += 1; 
            user.save()
                .then(() => console.log("User volunteer stats updated"))
                .catch(err => console.error("Error saving user:", err));
        });
    } catch (err) {
        console.error('Server error:', err);
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

// Get all events posted by current user
router.get('/my-events', auth, async (req, res) => {
    try {
        const events = await Event.find({ creator: req.user.id })
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName'])
            .sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get all events that the current user is a participant of
router.get('/my-p-events', auth, async (req, res) => {
    try {
        const events = await Event.find({ participants: req.user.id })
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName'])
            .sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get nearby events (within 20 mile radius)
router.get('/nearby', auth, async (req, res) => {
    try {
        const { address } = req.query;
        
        if (!address) {
            return res.status(400).json({ msg: 'Address is required' });
        }

        // Get all events
        const allEvents = await Event.find({ status: 'upcoming' })
            .populate('creator', ['firstName', 'lastName'])
            .populate('participants', ['firstName', 'lastName']);

        // Get coordinates for the search address
        const searchLocation = await googleMapsClient.geocode({
            params: {
                address: address,
                key: process.env.GOOGLE_MAPS_API_KEY
            }
        });

        if (searchLocation.data.results.length === 0) {
            return res.status(400).json({ msg: 'Invalid search address' });
        }

        const searchPoint = searchLocation.data.results[0].geometry.location;

        // Calculate distances and filter events
        const eventsWithDistance = await Promise.all(allEvents.map(async (event) => {
            try {
                const eventLocation = await googleMapsClient.geocode({
                    params: {
                        address: event.location,
                        key: process.env.GOOGLE_MAPS_API_KEY
                    }
                });

                if (eventLocation.data.results.length === 0) {
                    return null;
                }

                const eventPoint = eventLocation.data.results[0].geometry.location;
                
                // Calculate distance using Google Maps Distance Matrix API
                const distanceMatrix = await googleMapsClient.distancematrix({
                    params: {
                        origins: [`${searchPoint.lat},${searchPoint.lng}`],
                        destinations: [`${eventPoint.lat},${eventPoint.lng}`],
                        key: process.env.GOOGLE_MAPS_API_KEY
                    }
                });

                if (distanceMatrix.data.rows[0].elements[0].status === 'OK') {
                    const distanceInMiles = distanceMatrix.data.rows[0].elements[0].distance.value / 1609.34; // Convert meters to miles
                    
                    if (distanceInMiles <= 20) {
                        const eventObj = event.toObject();
                        return {
                            ...eventObj,
                            distance: Math.round(distanceInMiles * 10) / 10
                        };
                    }
                }
                return null;
            } catch (error) {
                console.error('Error processing event location:', error);
                return null;
            }
        }));

        // Filter out null values and sort by distance
        const nearbyEvents = eventsWithDistance
            .filter(event => event !== null)
            .sort((a, b) => a.distance - b.distance);

        res.json(nearbyEvents);
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Server Error');
    }
});

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function toRad(degrees) {
    return degrees * (Math.PI/180);
}

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

        User.findById(req.user.id).then(user => {
            if (!user) {
                return console.error("User not found");
            }
        
            user.volunteerHours += duration;  // ✅ Update volunteerHours
            user.completedOpportunities += 1; // ✅ Increment completedOpportunities
        
            user.save()
                .then(() => console.log("User volunteer stats updated"))
                .catch(err => console.error("Error saving user:", err));
        });


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

// Update event status
router.put('/:id/status', auth, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        const { status } = req.body;
        
        // Validate status
        if (!['upcoming', 'ongoing', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ msg: 'Invalid status' });
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
