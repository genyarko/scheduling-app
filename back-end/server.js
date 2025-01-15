const express = require('express');
const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const scheduleRoutes = require('./routes/schedule');
app.use('/api', scheduleRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
