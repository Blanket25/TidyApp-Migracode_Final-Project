import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useState } from "react";

const prop = 2;

function CreateGroup() {
  const [confirmationText, setConfirmationText] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [task, setTask] = useState({
    taskName: "",
    description: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleFrequency = (event) => {
    setFrequency(event.target.value);
  };

  const handleTask = (event) => {
    const value = event.target.value;
    setTask({
      ...task.description, //!por que???
      [event.target.name]: value,
    });
    console.log(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!task.taskName) {
      setValidationError("You're missing a roomie!");
    }
  };

  return (
    <div>
      <Nav />
      <div className="tasks-card-container">
        <p>{confirmationText}</p>
        <div className="task-card u-box-shadow">
          <p className="u-margin-bottom-small">
            How often do you want the tasks to rotate between roomies?
          </p>
          <select value={frequency} onChange={handleFrequency}>
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

          <form onSubmit={handleSubmit}>
            {new Array(prop).fill().map((n, index) => (
              <div key={index}>
                <p className="text-bold">Task {index + 1}</p>
                <input
                  name="task"
                  type="text"
                  placeholder="task's name"
                  onChange={handleTask}
                  value={task.name}
                />
                <textarea
                  name="taskDescription"
                  type="text"
                  placeholder="task's description"
                  onChange={handleTask}
                  value={task.description}
                />
              </div>
            ))}
            <p>{validationError}</p>
            <button type="submit" className="orange-btn">
              Finish
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateGroup;
