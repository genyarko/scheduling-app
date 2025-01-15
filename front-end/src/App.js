import React, { useState, useEffect } from "react";
import ScheduleMeetingForm from "./components/ScheduleMeetingForm";
import MeetingList from "./components/MeetingList";
import RescheduleModal from "./components/RescheduleModal"; // Import the modal
import { getMeetings, cancelMeeting, rescheduleMeeting } from "./services/api";
import "./App.css";

function App() {
  const [meetings, setMeetings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const fetchMeetings = async () => {
    try {
      const response = await getMeetings();
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleReschedule = (meetingId) => {
    const meeting = meetings.find((m) => m.id === meetingId);
    setSelectedMeeting(meeting);
    setModalOpen(true); // Open the modal
  };

  const handleRescheduleSubmit = async (newDateTime) => {
    try {
      await rescheduleMeeting(selectedMeeting.id, { newDateTime });
      fetchMeetings();
    } catch (error) {
      console.error("Error rescheduling meeting:", error);
    }
  };

  const handleCancel = async (meetingId) => {
    try {
      await cancelMeeting(meetingId);
      fetchMeetings();
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
            <MeetingList
              meetings={meetings}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </main>
      <RescheduleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleRescheduleSubmit}
        meeting={selectedMeeting}
      />
    </div>
  );
}

export default App;
