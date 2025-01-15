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
    console.log('Received meeting data:', req.body); // Log the incoming request data
    const { title, description, dateTime, participants, status } = req.body;

    if (!title || !dateTime || !participants) {
        return res.status(400).json({ error: 'Title, dateTime, and participants are required' });
    }

    const meeting = { id: meetings.length + 1, title, description, dateTime, participants, status: status || 'scheduled' };
    meetings.push(meeting);
    res.status(201).json(meeting);
});

// Route to reschedule a meeting
router.put('/meetings/:id', (req, res) => {
    const { id } = req.params;
    const { newDateTime } = req.body;

    if (!newDateTime) {
        return res.status(400).json({ error: 'newDateTime is required' });
    }

    const meetingIndex = meetings.findIndex(meeting => meeting.id === parseInt(id));
    if (meetingIndex === -1) {
        return res.status(404).json({ error: 'Meeting not found' });
    }

    // Update the meeting's dateTime
    meetings[meetingIndex].dateTime = newDateTime;
    res.status(200).json(meetings[meetingIndex]);
});

// Route to cancel a meeting
router.delete('/meetings/:id', (req, res) => {
    const { id } = req.params;

    const meetingIndex = meetings.findIndex(meeting => meeting.id === parseInt(id));
    if (meetingIndex === -1) {
        return res.status(404).json({ error: 'Meeting not found' });
    }

    // Remove the meeting from the list
    const [deletedMeeting] = meetings.splice(meetingIndex, 1);
    res.status(200).json(deletedMeeting);
});

module.exports = router;