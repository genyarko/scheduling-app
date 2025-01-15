import React from 'react';
import { Button } from '@mui/material';

const MeetingCard = ({ meeting, onReschedule, onCancel }) => (
    <div className="p-4 border rounded shadow-md mb-4">
        <h3 className="font-bold">{meeting.title}</h3>
        <p>Date & Time: {new Date(meeting.dateTime).toLocaleString()}</p>
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

export default MeetingCard;
