const db = require('../database/db');

// Get all meetings
exports.getAllMeetings = (req, res) => {
    const query = 'SELECT * FROM meetings';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching meetings');
        } else {
            res.json(results);
        }
    });
};

// Create a new meeting
exports.createMeeting = (req, res) => {
    const { title, dateTime, participants, status } = req.body;
    const query = 'INSERT INTO meetings (title, dateTime, participants, status) VALUES (?, ?, ?, ?)';
    db.query(query, [title, dateTime, participants, status], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating meeting');
        } else {
            res.status(201).send('Meeting created');
        }
    });
};

// Update a meeting
exports.updateMeeting = (req, res) => {
    const { id } = req.params;
    const { title, dateTime, participants, status } = req.body;
    const query = 'UPDATE meetings SET title = ?, dateTime = ?, participants = ?, status = ? WHERE id = ?';
    db.query(query, [title, dateTime, participants, status, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating meeting');
        } else {
            res.send('Meeting updated');
        }
    });
};

// Delete a meeting
exports.deleteMeeting = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM meetings WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting meeting');
        } else {
            res.send('Meeting deleted');
        }
    });
};
