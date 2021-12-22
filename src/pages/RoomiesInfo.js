import React, { useState, useEffect } from "react";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useNavigate, useLocation } from "react-router-dom";
//import { init } from 'emailjs-com';
//init('user_qM5g1zhJlzTpO2v22X8WF');

function RoomiesInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [roomies, setRoomies] = useState([]);
  const [validationError, setValidationError] = useState("");
  const { number } = state;
  useEffect(() => {
    const emptyRoomie = new Array(parseInt(number)).fill().map(() => ({
      roomieName: "",
      email: "",
    }));

    setRoomies(emptyRoomie);
  }, [number]);
  const handleTask = (attribute, newValue, index) => {
    const newRoomies = [...roomies];
    const newRoomie = { ...roomies[index] };
    newRoomie[attribute] = newValue;
    newRoomies[index] = newRoomie;
    console.log("New roomies", newRoomies);

    setRoomies(newRoomies);
  };
  const submitRoomies = () => {
    let isValid = true;
    roomies.map(
      (roomie) =>
        (isValid = isValid && roomie.roomieName !== "" && roomie.email !== "")
    );
    if (isValid) {
      navigate("/tasks-info", { state: { roomies } }); // pass roomies as a parametre, not as a prop
    } else {
      setValidationError("You're missing some information!");
    }
  };
  return (
    <div>
      <Nav />
      <div className="set-roomies-main-container">
        <div>
          <h3>Enter the info of {number} people</h3>
        </div>
        {roomies.map((n, index) => (
          <div key={`input-${index}`}>
            <p className="text-bold">Roomie {index + 1}</p>
            <div className="input-groups-container">
              <div className="input-group">
                <p>Name:</p>
                <input
                  name={`name-${index}`}
                  type="text"
                  onChange={(event) =>
                    handleTask("roomieName", event.target.value, index)
                  }
                  value={roomies[index].roomieName}
                />
              </div>
              <div className="input-group">
                <p>Email:</p>
                <input
                  type="text"
                  name={`email-${index}`}
                  onChange={(event) =>
                    handleTask("email", event.target.value, index)
                  }
                  value={roomies[index].email}
                />
              </div>
            </div>
          </div>
        ))}
        <p>{validationError}</p>
        <div className="roomies-info-btn-container u-margin-top-small ">
          <button className="orange-btn" onClick={submitRoomies}>
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default RoomiesInfo;
