import { useState, useEffect } from "react";
import Nav from "../pages/sharedComponents/Nav";
import { Link } from "react-router-dom";
import Footer from "./sharedComponents/Footer";

function EditFrequency() {
  const [frequency, setFrequency] = useState();
  const groupId = window.localStorage.getItem("groupId");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/groups/${groupId}`);
      const data = await response.json();
      console.log(data);

      setFrequency(data);
    };
    fetchData();
  }, [groupId]);

  const handleChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleClick = async () => {
    const result = await fetch(`https://localhost:4000/groups/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        frequency: frequency.frequency,
      }),
    });
    const data = await result.json();
    console.log(data);
  };

  return (
    <div className="big-container">
      <Nav />
      <div>
        <div className="edit-container edit-frequency u-box-shadow">
          <select name="frequency" value={frequency} onChange={handleChange}>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <div className="btns-container">
            <button
              className="purple-btn u-margin-top-medium"
              onClick={handleClick}
            >
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
      </div>
      <Footer />
    </div>
  );
}

export default EditFrequency;
