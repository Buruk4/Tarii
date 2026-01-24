import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import DailyMarking from './components/dailyMarking/DailyMarking';
import TradeJournal from './components/tradeJournal/TradeJournal';
import JournalHistory from './components/journalHistory/JournalHistory';
import Stats from './components/stats/Stats';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daily-marking" element={<DailyMarking />} />
          <Route path="/trade-journal" element={<TradeJournal />} />
          <Route path="/journal-history" element={<JournalHistory />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;