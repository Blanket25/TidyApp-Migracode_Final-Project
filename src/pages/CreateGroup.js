import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";

function CreateGroup() {
  return (
    <div>
      <Nav />
      <div className="group-card-container">
        <div className="group-card u-box-shadow">
          <h3>Add roomies</h3>
          <input type="text" />
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
