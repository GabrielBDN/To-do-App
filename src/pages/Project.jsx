import React, { useState } from 'react';
import '../styles/Project.css';

function Project() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');


  const addProject = () => {
    if (newProjectName.trim() === '') return;
    const newProject = { id: Date.now(), name: newProjectName, tasks: [] };
    setProjects([...projects, newProject]);
    setNewProjectName('');
  };

  
  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="project-page">
      <h1 className="title">Gestion des Projets</h1>
      
      
      <div className="input-container">
        <input
          type="text"
          placeholder="Nom du projet..."
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="input"
        />
        <button onClick={addProject} className="add-button">
          Ajouter Projet
        </button>
      </div>

      
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            <span className="project-name">{project.name}</span>
            <button
              onClick={() => deleteProject(project.id)}
              className="delete-button"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      
      {projects.length === 0 && (
        <p className="empty-message">Aucun projet pour le moment. Ajoutez-en un !</p>
      )}
    </div>
  );
}

export default Project;
