import React, { useState } from 'react';
import CalendarComponent from '../components/Calendar';

const Home = ({ events, setEvents }) => {
  const [newTask, setNewTask] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now;
  });

  
  const formatDateForInput = (date) => {
    if (!date || isNaN(date)) return '';
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().slice(0, 16);
  };

  
  const handleAddTask = () => {
    if (!newTask.trim()) {
      alert('Veuillez entrer un titre de tâche valide.');
      return;
    }
    if (!startDate || isNaN(startDate)) {
      alert('Veuillez entrer une date de début valide.');
      return;
    }

    const newTaskObj = {
      id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: newTask.trim(),
      start: startDate,
      end: new Date(startDate.getTime() + 60 * 60 * 1000), // Ajoute 1h
    };

    setEvents((prevEvents) => [...prevEvents, newTaskObj]);
    setNewTask('');
  };

  return (
    <div>
      <h1>Ma To-Do List</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Nouvelle tâche" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
        />

        <input 
          type="datetime-local" 
          value={formatDateForInput(startDate)} 
          onChange={(e) => {
            const value = e.target.value;
            setStartDate(value ? new Date(value) : null);
          }} 
        />

        <button onClick={handleAddTask}>Ajouter Tâche</button>
      </div>

      <CalendarComponent events={events} setEvents={setEvents} />
    </div>
  );
};

export default Home;
