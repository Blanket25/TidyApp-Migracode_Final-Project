import "../index.css";
import Footer from "./sharedComponents/Footer";
import logo from "../img/Logo.png";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup-main-container">
      <Link to="/">
        <img src={logo} alt="TidyApp" className="app-logo" />
      </Link>
      <div className="signup-form-container">
        <h2>Get Started!</h2>
        <p>create your first group</p>
        <form>
          <input type="text" placeholder="group"></input>
          <input type="text" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <button className="orange-btn">Create Group</button>
        </form>
        <p>I already have a group</p>
        <Link className="purple-btn" to="/login">
          Log in
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
