const express = require('express');
const router = express.Router();

// Mock data for meetings
const meetings = [];

// Route to get all meetings
router.get('/meetings', (req, res) => {
    res.json(meetings);
});

// Route to create a new meeting
router.post('/meetings', (req, res) => {
    const meeting = req.body;
    meetings.push(meeting);
    res.status(201).json(meeting);
});

module.exports = router;
