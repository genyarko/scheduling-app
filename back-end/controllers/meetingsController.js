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
    console.log("Request body:", req.body); // Log the incoming request
    const { title, dateTime, participants, status } = req.body;

    // Validate required fields
    if (!title || !dateTime || !participants) {
        return res.status(400).json({ error: 'Title, dateTime, and participants are required' });
    }

    const query = 'INSERT INTO meetings (title, dateTime, participants, status) VALUES (?, ?, ?, ?)';
    db.query(query, [title, dateTime, participants, status || 'scheduled'], (err, result) => {
        if (err) {
            console.error("Database error:", err.message); // Log the error
            res.status(500).send('Error creating meeting');
        } else {
            console.log("Meeting created with ID:", result.insertId); // Log the result
            res.status(201).json({ id: result.insertId });
        }
    });
};

// Update a meeting (general update)
exports.updateMeeting = (req, res) => {
    const { id } = req.params;
    const { title, dateTime, participants, status } = req.body;

    // Validate that at least one field is provided for update
    if (!title && !dateTime && !participants && !status) {
        return res.status(400).send('No fields provided for update');
    }

    // Dynamically build the SQL query based on provided fields
    let query = 'UPDATE meetings SET ';
    const updates = [];
    const values = [];

    if (title) {
        updates.push('title = ?');
        values.push(title);
    }
    if (dateTime) {
        updates.push('dateTime = ?');
        values.push(dateTime);
    }
    if (participants) {
        updates.push('participants = ?');
        values.push(participants);
    }
    if (status) {
        updates.push('status = ?');
        values.push(status);
    }

    query += updates.join(', ') + ' WHERE id = ?';
    values.push(id);

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating meeting');
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).send('Meeting not found');
            }
            res.send('Meeting updated');
        }
    });
};

// Reschedule a meeting (specific update for dateTime)
exports.rescheduleMeeting = (req, res) => {
    const { id } = req.params;
    const { newDateTime } = req.body;

    // Validate newDateTime
    if (!newDateTime) {
        return res.status(400).send('newDateTime is required');
    }

    const query = 'UPDATE meetings SET dateTime = ? WHERE id = ?';
    db.query(query, [newDateTime, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error rescheduling meeting');
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).send('Meeting not found');
            }
            res.send('Meeting rescheduled');
        }
    });
};

// Delete a meeting
exports.deleteMeeting = (req, res) => {
    const { id } = req.params;

    // First, check if the meeting exists
    const checkQuery = 'SELECT * FROM meetings WHERE id = ?';
    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error checking meeting');
        }

        if (results.length === 0) {
            return res.status(404).send('Meeting not found');
        }

        // If the meeting exists, proceed with deletion
        const deleteQuery = 'DELETE FROM meetings WHERE id = ?';
        db.query(deleteQuery, [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting meeting');
            } else {
                res.send('Meeting deleted');
            }
        });
    });
};