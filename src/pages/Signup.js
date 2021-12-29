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
    const group = newGroupData.group.length > 0;
    const email =
      newGroupData.email.includes("@") && newGroupData.email.includes(".");
    const password = newGroupData.password.length >= 6;
    const secret = newGroupData.secret.length >= 6;
    const username = newGroupData.username.length > 0;

    if (group && email && password && secret && username) {
      setIsSigned(true);
      arrayOfRegisteredUsers.push(newGroupData);
      setSignupText("");
      navigate("/number-of-roomies", { state: { newGroupData } });
    } else if (!group && email && password && secret && username) {
      setSignupText("Please enter the group name");
    } else if (group && !email && password && secret && username) {
      setSignupText("Please enter your email");
    } else if (group && email && password && !secret && username) {
      setSignupText(
        "Please choose a secret word (at least 6 characters long) for your group which will be used as a group password"
      );
    } else if (group && email && !password && secret && username) {
      setSignupText(
        "Please create a strong password (at least 6 characters long)"
      );
    } else if (group && email && password && secret && !username) {
      setSignupText("Please enter your name)");
    } else if (!group && !email && password && secret && username) {
      setSignupText("Please enter the group name and email");
    } else if (group && !email && !password && secret && username) {
      setSignupText("Please enter your email and password");
    } else if (!group && email && !password && secret && username) {
      setSignupText(
        "Please enter a group name and create a strong password (at least 6 characters long)"
      );
    } else if (!group && email && password && !secret && username) {
      setSignupText(
        "Please enter a group name and create a secret word for your group which will be used as a group password"
      );
    } else if (group && !email && password && !secret && username) {
      setSignupText(
        "Please enter your email and create a secret word for your group which will be used as a group password"
      );
    } else if (group && email && !password && !secret && username) {
      setSignupText(
        "Please create a strong password (at least 6 characters long) and create a secret word for your group which will be used as a group password"
      );
    } else if (!group && !email && !password && !secret && username) {
      setSignupText(
        "Please fill all the fields. Note,that your password should be at least 6 characters long)"
      );
    } else {
      setSignupText("You're missing some information!");
    }
  }

  return (
    <div className="signup-main-container">
      <Nav />
      <div className="signup-form-container">
        <h2>Get Started!</h2>
        <p>create your first group</p>
        <form>
          <input
            type="text"
            placeholder="your name"
            name="username"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            placeholder="group name"
            name="group"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            placeholder="group secret (group password)"
            name="groupSecret"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            placeholder="your email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder=" your password"
            name="password"
            onChange={handleChange}
          ></input>

          <button
            className="orange-btn"
            onClick={handleClick}
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
