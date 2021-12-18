import "../index.css";
import Nav from "./sharedComponents/Nav";
import Footer from "../pages/sharedComponents/Footer";

function NoOfRommies() {
    const handleSubmit=(e) => {
        e.preventDefault();
        const output=e.target.fvalue.value;
        console.log(output);
        }

  return (
    <div>
      <Nav />
      <div className="group-card-container">
        <div className="group-card">
          <h3>How many people live in your house?</h3>
        </div>
        <form onSubmit = {handleSubmit}>
            <input type="text" name="fvalue" placeholder="input value"/><br/><br/>
            <button>Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default NoOfRommies;
