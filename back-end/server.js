const PORT = 4000;

const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const apiFunction = require("./api.js");
const api = apiFunction();

app.use(bodyParser.json());

app.get("/task-list", api.getAllTask);
app.get("/users", api.getUsers);
app.post("/users", api.addUser);
app.post("/task", api.addNewTask);
app.delete("/users/:userId", api.deleteUser);
app.delete("/task/:taskId", api.deleteTask);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
