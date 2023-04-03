import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import WaitList from "./components/WaitList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/waitlist" />} />
        <Route path="/waitlist/:locationId" element={<WaitList />} />
      </Routes>
    </Router>
  );
}

export default App;
