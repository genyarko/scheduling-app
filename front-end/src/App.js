import React, { useState, useEffect } from 'react';
import ScheduleMeetingForm from './components/ScheduleMeetingForm';
import MeetingList from './components/MeetingList';
import { getMeetings, cancelMeeting, rescheduleMeeting } from './services/api';
import './App.css';

function App() {
  const [meetings, setMeetings] = useState([]);

  // Fetch meetings from the server
  const fetchMeetings = async () => {
    try {
      const response = await getMeetings();
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  // Fetch meetings when the component mounts
  useEffect(() => {
    fetchMeetings();
  }, []);

  // Function to handle rescheduling a meeting
  const handleReschedule = async (meetingId) => {
    try {
      // Add your rescheduling logic here
      console.log("Rescheduling meeting with ID:", meetingId);
      // Example: Open a rescheduling form or call an API
      await rescheduleMeeting(meetingId, { newDateTime: "2023-12-31T10:00:00" }); // Replace with actual logic
      fetchMeetings(); // Re-fetch meetings after rescheduling
    } catch (error) {
      console.error("Error rescheduling meeting:", error);
    }
  };

  // Function to handle canceling a meeting
  const handleCancel = async (meetingId) => {
    try {
      await cancelMeeting(meetingId);
      fetchMeetings(); // Re-fetch meetings after cancellation
    } catch (error) {
      console.error("Error canceling meeting:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold mb-6">Meeting Scheduler</h1>
      </header>
      <main className="App-main">
        <div className="flex flex-col items-center">
          <ScheduleMeetingForm onMeetingCreated={fetchMeetings} />
          <div className="mt-8 w-full max-w-2xl">
            {/* Pass onReschedule and onCancel functions to MeetingList */}
            <MeetingList
              meetings={meetings}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;