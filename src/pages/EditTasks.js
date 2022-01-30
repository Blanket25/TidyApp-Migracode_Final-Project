import { useState, useEffect } from "react";
import Nav from "../pages/sharedComponents/Nav";
import Footer from "./sharedComponents/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { URL } from "../globals";

function EditTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { idFromStorage } = state;

  useEffect(() => {
    const fetchData = async () => {
      // if (isNaN(groupId)) return;
      if (idFromStorage) {
        const response = await fetch(`${URL}/tasks/${idFromStorage}`);
        const data = await response.json();
        setTasks(data);
      }
    };
    fetchData();
  }, [idFromStorage]);

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
        return fetch(`${URL}/tasks/${task.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: task.task_name,
            description: task.description,
          }),
        });
      })
    );

    const responses = await Promise.all(
      requests.map((request) => request.text())
    );
  };

  const handleClickBoard = () => {
    navigate(`/board/${idFromStorage}`, { state: { idFromStorage } });
  };

  const handleClickAdminPanel = () => {
    navigate("/adminpanel", { state: { idFromStorage } });
  };

  return (
    <div className="main-container">
      <div>
        <Nav />
      </div>
      <div className="edit-container">
        <h3>Edit a task</h3>
        {tasks.map((task, index) => (
          <div className="small-edit-container" key={index}>
            <label>Task:</label>
            <input
              name={task.id}
              type="text"
              placeholder="task"
              value={task.task_name}
              onChange={(event) =>
                handleChange("task_name", event.target.value, index)
              }
            />
            <label>Descrption:</label>
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
        ))}
        <div className="btns-container u-margin-top-small">
          <button className="purple-btn" onClick={handleClick}>
            Save
          </button>
          <div className="link-btns u-margin-bottom-big">
            <button className="orange-btn" onClick={handleClickBoard}>
              Board
            </button>
            <button className="purple-btn" onClick={handleClickAdminPanel}>
              Admin Panel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default EditTasks;
