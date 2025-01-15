import React from 'react';
import ScheduleMeetingForm from './components/ScheduleMeetingForm'; // Correct relative path
import MeetingList from './components/MeetingList'; // Correct relative path
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold mb-6">Meeting Scheduler</h1>
      </header>
      <main className="App-main">
        <div className="flex flex-col items-center">
          <ScheduleMeetingForm />
          <div className="mt-8 w-full max-w-2xl">
            <MeetingList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;