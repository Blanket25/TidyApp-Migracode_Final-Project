import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated, logIn } from "../auth";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (email.length > 0) {
      //setIsLogged(isAuthenticated);
      //logIn("klsdjasdASFAWETGWEGF");
      setErrorMessage("Password reset link is sent to your email");
      //navigate("/board");
    } else if (!email) {
      setErrorMessage("Please enter your email to reset password");
    }
  };

  return (
    <div className="login-main-container">
      <Nav />
      <div className="form-container">
        <h2>Password reset!</h2>
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="email"
          />
          
          {/* <Link className="orange-btn" to="/board">
            Go to board
          </Link> */}
          <p>{erroMessage}</p>
          <button type="submit" className="orange-btn" disabled={isLogged}>
            Reset
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
