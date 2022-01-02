import "../index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../globals";

function ContentToPrint(props) {
  const [fetchedData, setFetchedData] = useState([]);
  const tasks = [];

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${URL}/tasks/${props.id}`);

      setFetchedData(data);
    };
    getData();

    console.log("This is params id:" + props.id);
  }, [props.id]);

  async function handleChange(index, e) {
    console.log(`changed task ${index}`);
    console.log(e.target.checked);
    tasks[index].task_completed = e.target.checked;
    console.log(tasks[index]);
    const response = await fetch(`${URL}/tasks/status/${tasks[index].id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task_completed: tasks[index].task_completed }),
    });
    if (!response.ok) throw Error(response.message);

    const data = await axios.get(`${URL}/tasks/${props.id}`);

    setFetchedData(data);
  }

  return (
    <div className="card-container">
      <div className="card">
        {fetchedData.data
          ? fetchedData.data.forEach((item) => {
              tasks.push(item);
            })
          : null}

        {tasks.map((item, index) => {
          return (
            <div className="task-container u-box-shadow" key={index} id={index}>
              <p>{item.username}</p>
              <div>
                <p>{item.task_name}</p>
                <p>{item.description}</p>
              </div>
              <input
                type="checkbox"
                checked={item.task_completed}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContentToPrint;
