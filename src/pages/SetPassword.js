import "../index.css";
import Footer from "./sharedComponents/Footer";
import Nav from "./sharedComponents/Nav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SetPassword() { 
  let location  = useLocation();
  console.log('b2222   ' + location.pathname.replace("/setpassword/",""));
  const userId = location.pathname.replace("/setpassword/","");
  const [password, setPasswordValue] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  let userInfo;
  const users =[];
  //const navigate = useNavigate();
  
  sendUsers();

 console.log(userId);
  const submitHandler = (event) => {
    event.preventDefault();

    if (users.length>0) {
      setErrorMessage("Link expired or not valid. Please contact your admin.");
    }
    else if (!password && !passwordRepeat) {
      setErrorMessage("Please fill password");
    }
    else if(password!==passwordRepeat){
        setErrorMessage("Entered password does not match");
    }
    else{
      userInfo = users[0];
    }
  };

  async function sendUsers(){
    const response = await fetch(`http://localhost:4000/users/${userId}`);
    users = await response.json();
  }

  const saveUserPassword = async () => {
    setErrorMessage("Password resetted");
    const response = await fetch("http://localhost:4000/users/${userId}", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userInfo,
      }),
    });
  }
    return (
    <div className="login-main-container">
      <Nav />
      <div className="form-container">
        <h2>Set new password!</h2>
        <form onSubmit={submitHandler}>
          <input
            autoFocus
            value={password}
            onChange={(event) => setPasswordValue(event.target.value)}
            type="password"
            placeholder="Password"
          />
          
          <input
            autoFocus
            value={passwordRepeat}
            onChange={(event) => setPasswordRepeat(event.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <p>{erroMessage}</p>
          <button onClick={saveUserPassword} className="orange-btn">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SetPassword;
