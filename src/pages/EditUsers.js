import { useState, useEffect } from "react";
import Nav from "../pages/sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import { useNavigate, useLocation } from "react-router-dom";

function EditUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { idFromStorage } = state;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4000/users/${idFromStorage}`
      );
      const data = await response.json();

      setUsers(data);
    };
    fetchData();
  }, [idFromStorage]);

  console.log(users);

  const handleChange = (attribute, newValue, index) => {
    const newUsers = [...users];
    const newUser = { ...users[index] };
    newUser[attribute] = newValue;
    newUsers[index] = newUser;
    setUsers(newUsers);
  };

  const handleClick = async () => {
    const requests = await Promise.all(
      users.map((user) => {
        return fetch(`http://localhost:4000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: user.username,
            email: user.email,
          }),
        });
      })
    );

    const responses = await Promise.all(
      requests.map((request) => request.text())
    );
    console.log(responses);
  };

  const handleClickBoard = () => {
    navigate(`/board/${idFromStorage}`, { state: { idFromStorage } });
  };

  const handleClickAdminPanel = () => {
    navigate("/adminpanel", { state: { idFromStorage } });
  };

  return (
    <div className="big-container">
      <div>
        <Nav />
      </div>
      <div className="edit-container">
        <h3>Edit a user</h3>
        {users.map((user, index) => (
          <div>
            <div className="small-edit-container" key={index}>
              <label>Username</label>
              <input
                name={user.id}
                type="text"
                placeholder="username"
                value={user.username}
                onChange={(event) =>
                  handleChange("username", event.target.value, index)
                }
              />
              <label>Email:</label>
              <input
                name={user.id}
                type="text"
                placeholder="email"
                value={user.email}
                onChange={(event) =>
                  handleChange("email", event.target.value, index)
                }
              />
            </div>
          </div>
        ))}
        <div className="btns-container">
          <button className="purple-btn" onClick={handleClick}>
            Save
          </button>
          <div className="link-btns u-margin-bottom-big">
            <button className="orange-btn" onClick={handleClickBoard}>
              Board
            </button>
            <button className="purple-btn" onClick={handleClickAdminPanel}>
              Admin Panel
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditUsers;
