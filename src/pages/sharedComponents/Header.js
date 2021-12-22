import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../auth";

function Header() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isAuthenticated);
  }, []);

  return (
    <header>
      <div className="header-nav-container">
        <Nav />
      </div>
      <div>
        {isLogged ? (
          <>
            <Link
              className="purple-btn"
              to="/"
              onClick={() => {
                setIsLogged(false);
                window.localStorage.clear();
              }}
            >
              Log out{" "}
            </Link>
            <Link className="orange-btn" to="/board">
              Go to board
            </Link>
          </>
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
