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

  const submitHandler = async (event) => {
    event.preventDefault();

    if (email.length > 0 && password.length >= 6) {
      setIsLogged(isAuthenticated);
      logIn("klsdjasdASFAWETGWEGF");

      const settings = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      const response = await fetch("http://localhost:4000/login", settings);
      // console.log(response);
      const data = await response.json();
      // console.log(data);

      const groupId = data.group_id;
      window.localStorage.setItem("group id", data);
      if (groupId.length > 0) {
        setIsLogged(true);
        navigate(`/board/${groupId}`);
      }
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
          <p>{erroMessage}</p>
          <Link  to="/ResetPassword">
            Forgot Password??
          </Link> 
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
