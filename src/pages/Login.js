import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [newText, setNewText] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const handleMailChange = (event) => setNewText(event.target.value);

  const handlePassChange = (event) => setPassword(event.target.value);

  return (
    <div className="login-main-container">
      <Nav />
      <div className="form-container">
        <h2>Welcome back!</h2>
        <form onSubmit={submitHandler}>
          <input
            value={newText}
            onChange={handleMailChange}
            type="text"
            placeholder="email"
          />
          <input
            value={password}
            onChange={handlePassChange}
            type="password"
            placeholder="password"
          />
          {/* <Link className="orange-btn" to="/board">
            Go to board
          </Link> */}
          <button className="orange-btn">Log in</button>
        </form>
        <p>I don't have a group yet</p>
        <Link className="orange-btn" to="/signup">
          Get started
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
