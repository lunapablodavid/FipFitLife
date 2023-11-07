import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import homePage from "./components/homePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/homePage" element={<homePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
