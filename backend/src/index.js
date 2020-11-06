const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);
  return next();
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({
      status: 'Error',
      message: 'The id parameter is invalid',
      payload: '',
    });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const { title } = request.query;

  if (projects.length > 0) {
    const results = title
      ? projects.filter((element) => element.title.includes(title))
      : projects;

    return response.status(200).json({
      status: 'Success',
      message: 'Projects has been found',
      payload: results,
    });
  } else {
    return response.status(404).json({
      status: 'Error',
      message: 'Projects not found',
      payload: '',
    });
  }
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  if (!title || !owner) {
    return response.status(400).json({
      status: 'Error',
      message: 'Title and Owner are required fields',
      payload: '',
    });
  } else {
    const project = {
      id: uuid(),
      title: title,
      owner: owner,
    };
    projects.push(project);
    return response.status(201).json({
      status: 'Success',
      message: 'The project has been created',
      payload: project,
    });
  }
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  if (!title && !owner) {
    return response.status(400).json({
      status: 'Error',
      message: 'The title and owner fields is required',
      payload: '',
    });
  }
  const projectIndex = projects.findIndex((element) => element.id === id);

  if (projectIndex >= 0) {
    title ? (projects[projectIndex].title = title) : null;
    owner ? (projects[projectIndex].owner = owner) : null;

    return response.status(200).json({
      status: 'Success',
      message: 'The project has been updated',
      payload: projects[projectIndex],
    });
  } else {
    return response.status(404).json({
      status: 'Error',
      message: 'Project not found',
      payload: '',
    });
  }
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((element) => element.id === id);

  if (projectIndex >= 0) {
    projects.splice(projectIndex, 1);

    return response.status(200).json({
      status: 'Success',
      message: 'The project has been deleted',
      payload: '',
    });
  } else {
    return response.status(404).json({
      status: 'Error',
      message: 'Project not found',
      payload: '',
    });
  }
});

app.listen(3333, () => console.log('The server is running 🚀'));
