import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";
import { logIn } from "../auth";
import { URL } from "../globals";
import md5 from 'md5';

function Login() {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  async function test() {
    try {
      let settings;
      if (email && encryptedPassword) {
        settings = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            encryptedPassword,
          }),
        };
        const response = await fetch(`${URL}/login`, settings);
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await test();
    if (response) {
      const idFromStorage = response.group_id;
      const typeOfUser = response.type_of_user;
      if (idFromStorage && typeOfUser === "admin") {
        setIsLogged(true);
        logIn(idFromStorage);
        navigate("/adminpanel", { state: { idFromStorage } });
      } else if (idFromStorage && typeOfUser === "roomie") {
        setIsLogged(false);
        setErrorMessage("Ups! It seems like you are not an admin!");
      }
    }
    else {
      setIsLogged(false);
      setErrorMessage("Ups! something went wrong. Please check your password or email and try again")
    }
  }


  const getPasswordFromInput = (event) => {
    setPassword(event.target.value)
    setEncryptedPassword(md5(event.target.value))
    // console.log(encryptedPassword);
  }
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
            type="email"
            placeholder="email"
          />
          <input
            value={password}
            onChange={getPasswordFromInput}
            type="password"
            placeholder="password"
            minLength="6"

          />
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
