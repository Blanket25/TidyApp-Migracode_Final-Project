import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const prop = 2;

function TasksInfo() {
  //const [confirmationText, setConfirmationText] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [tasks, setTasks] = useState([]);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const emptyTasks = new Array(prop).fill().map(() => ({
      taskName: "",
      description: "",
    }));

    setTasks(emptyTasks);
  }, []);

  const handleFrequency = (event) => {
    const value = event.target.value;
    console.log(value);
    setFrequency(value);
  };

  const handleTask = (attribute, newValue, index) => {
    const newTasks = [...tasks];
    const newTask = { ...tasks[index] };
    newTask[attribute] = newValue;
    newTasks[index] = newTask;
    console.log("New tasks", newTasks);

    setTasks(newTasks);
  };

  const handleClick = async () => {
    let isValid = true;

    tasks.map((task) => (isValid = isValid && task.taskName !== ""));

    if (isValid) {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks,
          frequency,
        }),
      });

      navigate("/board");
    } else {
      setValidationError("You're missing a roomie!");
    }
  };

  return (
    <div>
      <Nav />
      <div className="tasks-card-container">
        {/* <p>{confirmationText}</p> */}
        <div className="task-card u-box-shadow">
          <p className="u-margin-bottom-small">
            How often do you want the tasks to rotate between roomies?
          </p>
          <select name="frequency" value={frequency} onChange={handleFrequency}>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="task-card u-box-shadow">
          <p>
            Now, Since there are {prop} people living in your house, you should
            define {prop} main tasks
          </p>

          {new Array(prop).fill().map((n, index) => (
            <div key={`input-${index}`}>
              <p className="text-bold">Task {index + 1}</p>
              <input
                name={`name-${index}`}
                type="text"
                placeholder="task's name"
                onChange={(event) =>
                  handleTask("name", event.target.value, index)
                }
                value={tasks[index].taskName}
              />
              <textarea
                name={`description-${index}`}
                placeholder="task's description"
                onChange={(event) =>
                  handleTask("description", event.target.value, index)
                }
                value={tasks[index].description}
              />
            </div>
          ))}
          <p>{validationError}</p>
          <button onClick={handleClick} className="orange-btn">
            Finish
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TasksInfo;
