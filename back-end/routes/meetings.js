const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

// Define routes
router.get('/', meetingsController.getAllMeetings); // GET /api/meetings
router.post('/', meetingsController.createMeeting); // POST /api/meetings
router.put('/:id', meetingsController.updateMeeting); // PUT /api/meetings/:id
router.delete('/:id', meetingsController.deleteMeeting); // DELETE /api/meetings/:id

module.exports = router;
