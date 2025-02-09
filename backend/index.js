const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) =>console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
