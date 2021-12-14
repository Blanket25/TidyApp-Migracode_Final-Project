import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated, logIn } from "../auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (email.length > 0 && password.length >= 6) {
      setIsLogged(isAuthenticated);
      logIn("klsdjasdASFAWETGWEGF");
      navigate("/board");
    } else if (!email && password) {
      setErrorMessage("Please enter your email");
    } else if (email && !password) {
      setErrorMessage("Please enter the correct password");
    } else if (!email && !password) {
      setErrorMessage("Please enter your email and password");
    }
  };

  return (
    <div className="login-main-container">
      <Nav />
      <div className="form-container">
        <h2>Welcome back!</h2>
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="password"
          />
          {/* <Link className="orange-btn" to="/board">
            Go to board
          </Link> */}
          <p>{erroMessage}</p>
          <button type="submit" className="orange-btn" disabled={isLogged}>
            Log in
          </button>
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
