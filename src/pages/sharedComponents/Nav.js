import logo from "../../img/Logo.png";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/">
        <img src={logo} alt="TidyApp" className="app-logo" />
      </Link>
      <div></div>
    </div>
  );
}

export default Nav;
