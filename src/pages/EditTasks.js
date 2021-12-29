import { useState, useEffect } from "react";
import Nav from "../pages/sharedComponents/Nav";
import Footer from "./sharedComponents/Footer";
import { useNavigate, useLocation } from "react-router-dom";

function EditTasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { idFromStorage } = state;

  useEffect(() => {
    const fetchData = async () => {
      // if (isNaN(groupId)) return;
      if (idFromStorage) {
        const response = await fetch(
          `http://localhost:4000/tasks/${idFromStorage}`
        );
        const data = await response.json();
        console.log(data);

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
        return fetch(`http://localhost:4000/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: task.task_name,
            description: task.description,
            group_id: idFromStorage,
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

  const handleClickBoard = () => {
    navigate(`/board/${idFromStorage}`, { state: { idFromStorage } });
  };

  const handleClickAdminPanel = () => {
    navigate("/adminpanel", { state: { idFromStorage } });
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
