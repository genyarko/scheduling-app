import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

const RescheduleModal = ({ open, onClose, onSubmit, meeting }) => {
    const [newDateTime, setNewDateTime] = useState(null);

    const handleSubmit = () => {
        if (!newDateTime) {
            alert("Please select a valid date and time.");
            return;
        }
        onSubmit(newDateTime); // Pass the new date and time to the parent
        onClose(); // Close the modal
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Reschedule Meeting</DialogTitle>
            <DialogContent>
                <p>Rescheduling: {meeting?.title}</p>
                <DateTimePicker
                    label="New Date & Time"
                    value={newDateTime}
                    onChange={(newValue) => setNewDateTime(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Reschedule
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RescheduleModal;
