import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { isAuthenticated, logIn } from "../auth";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

function ResetPassword() {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email to reset password");
    }
  };

  const sendEmailResetPassword = async () => {
    
    const userId=1;
    const response = await fetch(`http://localhost:4000/users/${email}`);
    const data = await response.json();
    const isValid = true;
    if (isValid) {
      
      data.forEach((user) => {
        emailjs
          .send(
            "service_kbjdvl4",
            "template_k7fxp8r",
            {
              to_name: user.username,
              link: `http://localhost:3000/setpassword/${user.id}`,
              to_email: user.email,
              admin_name: '',
              group_name: '',
              group_secret: '',
            },
            "user_qM5g1zhJlzTpO2v22X8WF"
          )
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
            },
            (err) => {
              console.log("FAILED...", err);
            }
          );
      });
      setErrorMessage("Password reset link is sent to your email");
    } else {
      setErrorMessage("No such user exists");
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
          
          <p>{erroMessage}</p>
          <button onClick={sendEmailResetPassword} className="orange-btn">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ResetPassword;
