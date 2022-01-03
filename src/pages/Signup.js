import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [isSigned, setIsSigned] = useState(false);
  const [signupText, setSignupText] = useState("");
  const arrayOfRegisteredUsers = [];
  const [newGroupData, setNewGroupData] = useState({
    group: "",
    email: "",
    password: "",
    secret: "",
    username: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewGroupData((prevValue) => {
      if (name === "group") {
        return {
          group: value,
          email: prevValue.email,
          password: prevValue.password,
          secret: prevValue.secret,
          username: prevValue.username,
        };
      }

      if (name === "email") {
        return {
          group: prevValue.group,
          email: value,
          password: prevValue.password,
          secret: prevValue.secret,
          username: prevValue.username,
        };
      }

      if (name === "password") {
        return {
          group: prevValue.group,
          email: prevValue.email,
          password: value,
          secret: prevValue.secret,
          username: prevValue.username,
        };
      }

      if (name === "groupSecret") {
        return {
          group: prevValue.group,
          email: prevValue.email,
          password: prevValue.password,
          secret: value,
          username: prevValue.username,
        };
      }

      if (name === "username") {
        return {
          group: prevValue.group,
          email: prevValue.email,
          password: prevValue.password,
          secret: prevValue.secret,
          username: value,
        };
      }
    });
  };

  async function handleClick(event) {
    event.preventDefault();
    setIsSigned(true);
    arrayOfRegisteredUsers.push(newGroupData);
    setSignupText("");
    navigate("/number-of-roomies", { state: { newGroupData } });
  }

  return (
    <div className="signup-main-container">
      <Nav />
      <div className="signup-form-container">
        <h2>Get Started!</h2>
        <p>create your first group</p>
        <form onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Your name"
            name="username"
            onChange={handleChange}

            minlength="3"

            required
          ></input>
          <input
            type="text"
            placeholder="Group name"
            name="group"
            onChange={handleChange}

            minlength="3"
            required
          ></input>
          <input
            type="text"
            minlength="6"

            required
            placeholder="Group secret (group password)"
            name="groupSecret"
            onChange={handleChange}
          ></input>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            minlength="6"

            required
            onChange={handleChange}
          ></input>

          <button
            className="orange-btn"
            type="submit"
            disabled={isSigned ? true : false}
          >
            Create Group
          </button>
          <p>{signupText}</p>
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
