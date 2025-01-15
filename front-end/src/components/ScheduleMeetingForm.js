import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { createMeeting } from "../services/api";

const ScheduleMeetingForm = ({ onMeetingCreated }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [duration, setDuration] = useState("");
    const [participants, setParticipants] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !date || !time || !duration || !participants) {
            alert("All fields are required!");
            return;
        }

        const dateTime = `${date}T${time}`;
        const meetingData = { title, description, dateTime, duration, participants };

        try {
            console.log("Sending meeting data:", meetingData); // Debugging log
            const response = await createMeeting(meetingData);
            console.log("API Response:", response.data); // Debugging log
            alert(`Meeting scheduled successfully with ID: ${response.data.id}`);

            // Notify the parent component that a new meeting has been created
            if (onMeetingCreated) {
                onMeetingCreated();
            }
        } catch (error) {
            console.error("Error scheduling meeting:", error.response || error.message);
            alert(`Failed to schedule meeting: ${error.response?.data || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md max-w-md">
            <h2 className="text-lg font-bold mb-4">Schedule a Meeting</h2>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                className="mb-4"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
                className="mb-4"
            />
            <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth className="mb-4" />}
            />
            <TimePicker
                label="Time"
                value={time}
                onChange={(newValue) => setTime(newValue)}
                renderInput={(params) => <TextField {...params} fullWidth className="mb-4" />}
            />
            <TextField
                label="Duration (minutes)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                fullWidth
                className="mb-4"
            />
            <TextField
                label="Participants (comma-separated IDs)"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                fullWidth
                className="mb-4"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Schedule Meeting
            </Button>
        </form>
    );
};

export default ScheduleMeetingForm;