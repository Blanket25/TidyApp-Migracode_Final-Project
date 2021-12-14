import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";
import printer from "../img/printer.svg";
import ContentToPrint from "./ContentToPrint";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

function Board() {
  class ComponentToPrint extends React.Component {
    render() {
      return (
        <div>
          <ContentToPrint />
        </div>
      );
    }
  }

  const componentRef = useRef();

  return (
    <div>
      <div className="board-header">
        <Nav />
        <ReactToPrint
          trigger={() => (
            <button className="purple-btn print-btn">
              <img src={printer} alt="printer icon" />
              <p>Print it!</p>{" "}
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <ComponentToPrint ref={componentRef} />
      <Footer />
    </div>
  );
}

export default Board;
