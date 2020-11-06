import React, { useState, useEffect } from 'react';

// Importing Header component
import Header from './components/Header';

// Importint CSS styles
import './App.css';

// Importing API
import api from './services/api';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((getResponse) => {
      setProjects(getResponse.data.payload);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Esdras',
    });

    const project = response.data.payload;
    console.log(project);

    setProjects([...projects, project]);
  }

  return (
    <div>
      <Header title="Projects" />

      <ul>
        {projects.map(({ title, id }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>

      <button type="button" onClick={() => handleAddProject()}>
        Adicionar novo Projeto
      </button>
    </div>
  );
};

export default App;
