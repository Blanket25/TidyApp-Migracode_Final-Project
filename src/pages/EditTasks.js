import { useState, useEffect } from "react";
import Nav from "../pages/sharedComponents/Nav";
import { Link } from "react-router-dom";
import Footer from "./sharedComponents/Footer";

function EditUsers() {
  const [tasks, setTasks] = useState([]);
  const groupId = parseInt(window.localStorage.getItem("groupId")); //const groupId = 4;

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(groupId)) return;

      const response = await fetch(`http://localhost:4000/tasks/${groupId}`);
      const data = await response.json();
      console.log(data);

      setTasks(data);
    };
    fetchData();
  }, [groupId]);

  const handleChange = (attribute, newValue, index) => {
    const newTasks = [...tasks];
    const newTask = { ...tasks[index] };
    newTask[attribute] = newValue;
    newTasks[index] = newTask;
    setTasks(newTasks);
  };

  const handleClick = async () => {
    const requests = await Promise.all(
      tasks.map((task) => {
        return fetch(`http://localhost:4000/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: task.task_name,
            description: task.description,
            group_id: groupId,
            user_id: task.user_id,
            task_completed: task.task_completed,
            starting_date: task.starting_date,
          }),
        });
      })
    );

    const responses = await Promise.all(
      requests.map((request) => request.text())
    );
    console.log(responses);
  };

  return (
    <div className="big-container">
      <div>
        <Nav />
      </div>
      <div className="edit-container">
        <h3>Edit a task</h3>
        {tasks.map((task, index) => (
          <div>
            <div className="small-edit-container" key={index}>
              <input
                name={task.id}
                type="text"
                placeholder="task"
                value={task.task_name}
                onChange={(event) =>
                  handleChange("task_name", event.target.value, index)
                }
              />
              <input
                name={task.id}
                type="text"
                placeholder="description"
                value={task.description}
                onChange={(event) =>
                  handleChange("description", event.target.value, index)
                }
              />
            </div>
          </div>
        ))}
        <div className="btns-container">
          <button className="purple-btn" onClick={handleClick}>
            Save
          </button>
          <div className="link-btns">
            <Link className="orange-btn" to="/board">
              Board
            </Link>
            <Link className="purple-btn" to="/adminpanel">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditUsers;
