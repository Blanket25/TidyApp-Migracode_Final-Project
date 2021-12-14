import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useState } from "react";

function CreateGroup() {
  const [inputFields, setInputFields] = useState([{ roomie: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (index, event) => {
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { roomie: "" }]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div>
      <Nav />
      <div className="group-card-container">
        <div className="group-card u-box-shadow">
          <h3>Add roomies</h3>
          <form onSubmit={handleSubmit}>
            {inputFields.map((inputField, index) => (
              <div key={index}>
                <input
                  name="roomie"
                  type="text"
                  placeholder="Roomie's name"
                  value={inputField.roomie}
                  onChange={(event) =>
                    handleChangeInput(index, "roomie", event)
                  }
                />
                <button
                  className="purple-btn input-btn"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
                <button
                  className="purple-btn input-btn"
                  onClick={() => handleRemoveFields()}
                >
                  -
                </button>
              </div>
            ))}
            <button className="orange-btn" type="submit" onClick={handleSubmit}>
              Add
            </button>
          </form>
        </div>
        <div className="group-card">
          <h3>Add tasks </h3>
          <input type="text" />
        </div>
        <div className="group-card ">
          <h3>
            Choose frequency :
            <br />
            weekly, biweekly, monthly
          </h3>
          <input type="text" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreateGroup;
