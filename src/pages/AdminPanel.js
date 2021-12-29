import Nav from "../pages/sharedComponents/Nav";
import { Link } from "react-router-dom";
import Footer from "../pages/sharedComponents/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { idFromStorage } = state;

  console.log(idFromStorage);
  function handleClickTasks() {
    navigate("/edit_tasks", { state: { idFromStorage } });
    console.log(idFromStorage);
  }

  function handleClickUsers() {
    navigate("/edit_users", { state: { idFromStorage } });
    console.log(idFromStorage);
  }

  function handleClickFrequency() {
    navigate("/edit_frequency", { state: { idFromStorage } });
    console.log(idFromStorage);
  }

  return (
    <>
      <div className="admin-panel-logo-container">
        <Nav />
      </div>

      <div className="admin-panel-container">
        <h3>Settings</h3>

        <button onClick={handleClickTasks} className="orange-btn u-center-text">
          Edit a task
        </button>
        <button className="orange-btn u-center-text" onClick={handleClickUsers}>
          Edit a roomie
        </button>
        <button
          className="orange-btn u-center-text"
          onClick={handleClickFrequency}
        >
          Edit frequency
        </button>

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
