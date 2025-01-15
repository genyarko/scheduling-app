import React from 'react';
import MeetingCard from './MeetingCard';

const MeetingList = ({ meetings = [], onReschedule, onCancel }) => {
  console.log("Meetings:", meetings);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Scheduled Meetings</h2>
      {meetings && meetings.length > 0 ? (
        meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
            onReschedule={onReschedule}
            onCancel={onCancel}
          />
        ))
      ) : (
        <p>No meetings scheduled.</p>
      )}
    </div>
  );
};

// Default props for safety
MeetingList.defaultProps = {
  meetings: [],
  onReschedule: () => console.warn("onReschedule function not provided"), // Default function
  onCancel: () => console.warn("onCancel function not provided"), // Default function
};

export default MeetingList;
