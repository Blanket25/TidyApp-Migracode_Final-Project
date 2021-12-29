import { useState, useEffect } from "react";
import Nav from "../pages/sharedComponents/Nav";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./sharedComponents/Footer";

function EditFrequency() {
  const [frequency, setFrequency] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { idFromStorage } = state;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/groups/${idFromStorage}`
      );
      const data = await response.json();
      console.log(data);

      setFrequency(data);
    };
    fetchData();
  }, [idFromStorage]);

  const handleChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleClick = async () => {
    const result = await fetch(
      `http://localhost:4000/groups/${idFromStorage}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          frequency: frequency.frequency,
        }),
      }
    );

    const data = await result.json();
    console.log(data);
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
