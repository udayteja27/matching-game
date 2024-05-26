import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import InstructionScreen from "./pages/InstructionScreen";
import ActivityScreen from "./pages/ActivityScreen";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/instruction" element={<InstructionScreen />} />
          <Route path="/activity" element={<ActivityScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
