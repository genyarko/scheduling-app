import React from 'react';
import { Button } from '@mui/material';

const MeetingCard = ({ meeting, onReschedule, onCancel }) => {
    // Parse the dateTime string into a Date object
    const dateTime = new Date(meeting.dateTime);

    // Check if the date is valid
    const isValidDate = !isNaN(dateTime.getTime());

    // Format the date and time for display (if valid)
    const formattedDateTime = isValidDate ? dateTime.toLocaleString() : 'Invalid Date';

    return (
        <div className="p-4 border rounded shadow-md mb-4">
            <h3 className="font-bold">{meeting.title}</h3>
            <p>Date & Time: {formattedDateTime}</p>
            <p>Participants: {meeting.participants}</p>
            <p>Status: {meeting.status}</p>
            <div className="flex space-x-2 mt-2">
                <Button variant="outlined" onClick={() => onReschedule(meeting.id)}>
                    Reschedule
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onCancel(meeting.id)}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default MeetingCard;
