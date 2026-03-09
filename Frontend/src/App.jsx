import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
// import DailyMarking from "./components/dailyMarking/DailyMarking";
import TradeJournal from "./components/tradeJournal/TradeJournal";
import TradesMonth from "./components/trades/TradesMonth";
// import JournalHistory from "./components/journalHistory/JournalHistory";
// import Stats from "./components/stats/Stats";
// import Navbar from "./components/common/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";
import AppShell from "./components/common/AppShell";
import "./App.css";
import Home from "./page/home/Home";

function App() {
  const theme = "dark";

  return (
    <Router>
      <div data-theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<PrivateRoute />}>
            <Route element={<AppShell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/trades" element={<TradesMonth />} />
              <Route path="/trade-journal" element={<TradeJournal />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
