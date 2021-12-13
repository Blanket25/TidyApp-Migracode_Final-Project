import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [isSigned, setIsSigned] = useState(false);
  const [signupText, setSignupText] = useState("");
  const arrayOfRegisteredUsers = [];
  const [newUserData, setNewUserData] = useState({
    group: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUserData((prevValue) => {
      if (name === "group") {
        return {
          group: value,
          email: prevValue.email,
          password: prevValue.password,
        };
      }
      if (name === "email") {
        return {
          group: prevValue.group,
          email: value,
          password: prevValue.password,
        };
      }
      if (name === "password") {
        return {
          group: prevValue.group,
          email: prevValue.email,
          password: value,
        };
      }
    });
  };

  function handleClick(event) {
    event.preventDefault();
    const group = newUserData.group.length > 0;
    const email = newUserData.email.length > 0;
    const password = newUserData.password.length >= 6;

    if (group && email && password) {
      setIsSigned(true);
      arrayOfRegisteredUsers.push(newUserData);

      // console.log(arrayOfRegisteredUsers);
      setSignupText(
        "Your group was successfully created, you can now open the board"
      );
    } else if (!group && email && password) {
      setSignupText("Please enter the group name");
    } else if (group && !email && password) {
      setSignupText("Please enter your email");
    } else if (group && email && !password) {
      setSignupText(
        "Please create a strong password (at least 6 characters long)"
      );
    } else if (!group && !email && password) {
      setSignupText("Please enter the group name and email");
    } else if (group && !email && !password) {
      setSignupText("Please enter your email and password");
    } else if (!group && email && !password) {
      setSignupText(
        "Please enter a group name and create a strong password (at least 6 characters long)"
      );
    } else if (!group && !email && !password) {
      setSignupText(
        "Please fill all the fields. Note,that your password should be at least 6 characters long)"
      );
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
            placeholder="group"
            name="group"
            onChange={handleChange}
          ></input>
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="password"
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
          <Link to="/board">
            <button className="orange-btn" disabled={isSigned ? false : true}>
              Go to board
            </button>
          </Link>
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
