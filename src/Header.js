import "./index.css";

function Header() {
  return (
    <header>
      <img src="../img/Logo.png" alt="TidyApp"></img>
      <div>
        <button className="purple-btn">Log in</button>
        <button className="orange-btn">Get started</button>
      </div>
    </header>
  );
}

export default Header;
