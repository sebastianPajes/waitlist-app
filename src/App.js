import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import WaitList from "./components/WaitList";
import JoinQueueForm from './components/JoinQueueForm';
import ConfirmationPage from './components/ConfirmationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/waitlist" />} />
        <Route path="/waitlist/:locationId" element={<WaitList />} />
        <Route path="/waitlist/:locationId/join-queue" element={<JoinQueueForm />} />
        <Route path="/waitlist/:locationId/join-queue/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
