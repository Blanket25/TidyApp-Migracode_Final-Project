import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated, logOut } from "../../auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const idFromStorage = window.localStorage.getItem("groupId");

  const [isLogged, setIsLogged] = useState(idFromStorage !== null);
  useEffect(() => {
    if (idFromStorage !== null) setIsLogged(true);
  }, [idFromStorage]);

  const goToBoard = () => {
    if (idFromStorage.length > 0) {
      navigate(`/board/${idFromStorage}`, { state: { idFromStorage } });
    }
  };

  const goToAdminPanel = () => {
    if (idFromStorage.length > 0) {
      navigate("adminpanel", { state: { idFromStorage } });
    }
  };

  return (
    <header>
      <div className="header-nav-container">
        <Nav />
      </div>
      <div>
        {isLogged ? (
          <div className="header-btns">
            <Link
              className="purple-btn"
              to="/"
              onClick={() => {
                setIsLogged(false);
                logOut();
              }}
            >
              Log out{" "}
            </Link>

            <button className="orange-btn" onClick={goToBoard}>
              Go to board
            </button>
            <button className="orange-btn last-btn" onClick={goToAdminPanel}>
              Admin Panel
            </button>
          </div>
        ) : (
          <>
            <Link className="purple-btn" to="/login">
              Log in
            </Link>
            <Link className="orange-btn" to="/signup">
              Get started
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
