const express = require('express');
const cors = require('cors');
const scheduleRoutes = require('./routes/schedule');

const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());

// Middleware to handle CORS
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the front-end

// Import routes
app.use('/api', scheduleRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});