const PORT = 4000;

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const apiFunction = require('./api.js');
const api = apiFunction();

app.use(
	express.json({
		type: ['application/json', 'text/plain'],
	})
);

//GET
app.get('/tasks', api.getTasks);
app.get('/users', api.getUsers);

//POST
app.post('/users', api.addNewUsers);
app.post('/tasks', api.addNewTasks);
app.post('/groups', api.addNewGroup);

//DELETE
app.delete('/users/:userId', api.deleteUser);
app.delete('/tasks/:taskId', api.deleteTask);

//PUT
app.put('/tasks/:taskId', api.updateTask);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
