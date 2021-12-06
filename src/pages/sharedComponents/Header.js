import logo from "../../img/Logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <img src={logo} alt="TidyApp" className="app-logo"></img>
      <div>
        <Link className="purple-btn" to="/login">
          Log in
        </Link>
        <Link className="orange-btn" to="/signup">
          Get started
        </Link>
      </div>
    </header>
  );
}

export default Header;
