import Nav from "../pages/sharedComponents/Nav";
import { Link } from "react-router-dom";
import Footer from "../pages/sharedComponents/Footer";

const AdminPanel = () => {
  //const groupId = window.localStorage.getItem("groupId");

  return (
    <>
      <div className="admin-panel-logo-container">
        <Nav />
      </div>

      <div className="admin-panel-container">
        <h3>Settings</h3>

        <Link className="orange-btn u-center-text" to="/edit_tasks">
          Edit a task
        </Link>
        <Link className="orange-btn u-center-text" to="/edit_users">
          Edit a roomie
        </Link>
        <Link className="orange-btn u-center-text" to="/edit_frequency">
          Edit frequency
        </Link>

        <div className="u-center-text admin-panel-board-redirection ">
          <p>Go to the task board</p>
          <Link to="/board">
            <button className="purple-btn"> Board</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AdminPanel;

