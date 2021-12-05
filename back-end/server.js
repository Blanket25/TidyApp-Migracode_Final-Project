const PORT = 4000;
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const apiFunction = require('./api.js');
const api = apiFunction();

app.use(bodyParser.json());

// getting all the task list
app.get("/task-list", api.getAllTask);
app.get("/users", api.getUsers); 


app.post("/users", api.addUser);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));