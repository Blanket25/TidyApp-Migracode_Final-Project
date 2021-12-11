import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup-main-container">
      <Nav />
      <div className="signup-form-container">
        <h2>Get Started!</h2>
        <p>create your first group</p>
        <form>
          <input type="text" placeholder="group" />
          <input type="text" placeholder="email" />
          <input type="password" placeholder="password" />
          <Link className="orange-btn" to="/create_group">
            Create Group
          </Link>
          {/* <button className="orange-btn">Create Group</button> */}
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
