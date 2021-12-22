import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NoOfRommies() {
  const [number, setNumber] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(number);
    navigate("/tasks-info", { state: { number } }); // pass the number of roomies as a parametre, not as a prop
    //should be redirect to roomies info, and that one to tasks info

    //TODO post request to send number of roomies to server
  };

  return (
    <div className="roomies-main">
      <Nav />
      <div className="roomies-container">
        <div className="task-card roomies-card">
          <h3>How many people live in your house?</h3>

          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
            <button className="orange-btn">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NoOfRommies;
