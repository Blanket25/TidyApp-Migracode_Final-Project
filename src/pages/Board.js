import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import printer from "../img/printer.svg";

function Board() {
  return (
    <div>
      <div className="board-header">
        <Nav />
        <button className="purple-btn print-btn">
          <img src={printer} alt="printer icon" />
          <p>Print it!</p>
        </button>
      </div>
      <div className="card-container">
        <div className="card">
          <p>Nombre</p>
          <div>
            <p>Tarea</p>
          </div>
          <input type="checkbox" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Board;
