const PORT = 4000;

const bodyParser = require("body-parser");

const express = require("express");
const app = express();

const apiFunction = require("./api.js");
const api = apiFunction();

app.use(bodyParser.json());

//GET
app.get("/tasks", api.getTasks);
app.get("/users", api.getUsers);

//POST
app.post("/users", api.addNewUser);
app.post("/tasks", api.addNewTask);
app.post("/groups", api.addNewGroup);

//DELETE
app.delete("/users/:userId", api.deleteUser);
app.delete("/tasks/:taskId", api.deleteTask);

//PUT AND PATCH
app.put("/tasks/:taskId", api.updateTask);
app.patch("/users/:userId", api.updateUser);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
