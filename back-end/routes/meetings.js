const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

// Define routes
router.get('/', meetingsController.getAllMeetings); // GET /api/meetings - Get all meetings
router.post('/', meetingsController.createMeeting); // POST /api/meetings - Create a new meeting
router.put('/:id', meetingsController.updateMeeting); // PUT /api/meetings/:id - Update a meeting (general update)
router.put('/:id/reschedule', meetingsController.rescheduleMeeting); // PUT /api/meetings/:id/reschedule - Reschedule a meeting (specific update for dateTime)
router.delete('/:id', meetingsController.deleteMeeting); // DELETE /api/meetings/:id - Delete a meeting

module.exports = router;