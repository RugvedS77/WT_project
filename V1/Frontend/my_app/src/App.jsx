import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router> {/* Wrap the entire app with BrowserRouter */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<h1 className="text-center mt-20 text-3xl">Welcome to Dashboard</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
