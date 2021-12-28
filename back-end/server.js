const PORT = 4000;

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

const apiFunction = require("./api.js");
const api = apiFunction();

app.use(bodyParser.json());

//GET
app.get("/tasks/:groupId", api.getTasks);
app.get("/users/:groupId", api.getUsers);
app.get("/groups/:groupId", api.getGroups);
app.get("/board/:groupId", api.getBoardInfo);

//POST
app.post("/users", api.addNewUsers);
app.post("/tasks", api.addNewTasks);
app.post("/groups", api.addNewGroup);
app.post("/login", api.login);

//DELETE
app.delete("/users/:userId", api.deleteUser);
app.delete("/tasks/:taskId", api.deleteTask);

//PUT AND PATCH
app.put("/tasks/:taskId", api.updateTask);
app.patch("/users/:userId", api.updateUser);

app.listen(PORT, () => console.log(`app listening on port: ${PORT}`));
