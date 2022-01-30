import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { isAuthenticated } from "../auth";
import { useNavigate } from "react-router-dom";
import { logIn } from "../auth";
import { URL } from "../globals";

function Login() {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  async function test() {
    try {
      if (email && password) {
        const settings = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        };
        const response = await fetch(`${URL}/login`, settings);
        const data = await response.json();
        return data;
      }

    } catch (error) {
      console.log(error.error);
      console.log(error);
      setErrorMessage(error);

    }
  }
  const submitHandler = async (event) => {
    event.preventDefault();

    const response = test();
    // const response = await fetch(`${URL}/login`, settings).catch(e => { console.log(e) });
    // const data = await response.json();
    const idFromStorage = response.group_id;
    const typeOfUser = response.type_of_user;
    // if () {
    //   setErrorMessage("Server error, please try again later");
    // }
    // if (response.status_code === 200) {
    if (idFromStorage && typeOfUser === "admin") {
      setIsLogged(true);
      logIn(idFromStorage);
      navigate("/adminpanel", { state: { idFromStorage } });
    } else if (idFromStorage && typeOfUser === "roomie") {
      setIsLogged(false);
      setErrorMessage("Ups! It seems like you are not an admin!");
    }
    // }
    // if (response.status_code === 400) {
    //   console.log("responsejson" + response.json());
    //   console.log("response" + response);
    //   console.log("response" + response.text);
    //   console.log("responsejson" + response.json().text);


    //   setErrorMessage("Text" + response.text);
    // }

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
            onChange={(event) => setPassword(event.target.value)}
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
