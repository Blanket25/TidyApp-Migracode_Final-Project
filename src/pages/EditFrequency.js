import { useState, useEffect } from "react";
import Nav from "../pages/sharedComponents/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./sharedComponents/Footer";
import { URL } from "../globals";

function EditFrequency() {
  const [frequency, setFrequency] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { idFromStorage } = state;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${URL}/groups/${idFromStorage}`);
      const data = await response.json();
      console.log(data);

      setFrequency(data);
    };
    fetchData();
  }, [idFromStorage]);

  const handleChange = (attribute, newValue, index) => {
    const newFrequencies = [...frequency];
    const newFrequency = { ...frequency[index] };
    newFrequency[attribute] = newValue;
    newFrequencies[index] = newFrequency;
    setFrequency(newFrequencies);
  };

  const handleClick = async () => {
    try {
      const requests = await Promise.all(
        frequency.map((f) => {
          return fetch(`${URL}/groups/${idFromStorage}`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              frequency: f.frequency,
            }),
          });
        })
      );

      const responses = await Promise.all(
        requests.map((request) => request.text())
      );
      console.log(responses);
    } catch (error) {
      console.log("Ups! Something went wrong: " + error);
    }
  };

  const handleClickBoard = () => {
    navigate(`/board/${idFromStorage}`, { state: { idFromStorage } });
  };

  const handleClickAdminPanel = () => {
    navigate("/adminpanel", { state: { idFromStorage } });
  };

  return (
    <div className="big-container">
      <Nav />
      <div>
        <div className="edit-container edit-frequency u-box-shadow">
          {frequency.map((f, index) => {
            return (
              <select
                key={index}
                name="frequency"
                value={f.frequency}
                onChange={(event) =>
                  handleChange("frequency", event.target.value, index)
                }
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
              </select>
            );
          })}
          <div className="btns-container">
            <button
              className="purple-btn u-margin-top-medium"
              onClick={handleClick}
            >
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
      </div>
      <Footer />
    </div>
  );
}

export default EditFrequency;
