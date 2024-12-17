import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Project from './pages/Project';
import './App.css';

function App() {

  const [events, setEvents] = useState([]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home events={events} setEvents={setEvents} />}
        />
        <Route
          path="/projects"
          element={<Project events={events} setEvents={setEvents} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
