const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  location: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  maxParticipants: { 
    type: Number, 
    required: true 
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], 
    default: 'upcoming' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  category: { 
    type: String, 
    required: true 
  },
  hoursWorth: { 
    type: Number, 
    required: true 
  }
});

// Create a geospatial index on the coordinates field
eventSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Event', eventSchema);
