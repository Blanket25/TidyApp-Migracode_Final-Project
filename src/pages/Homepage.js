import "../index.css";
import homepageMainImg from "../img/homepage-main-img.svg";
import lunchBreackMonochromatic from "../img/Lunch break_Monochromatic.svg";
import teamWorkMonochromatic from "../img/Team work_Monochromatic.svg";
import Header from "./sharedComponents/Header";
import Footer from "./sharedComponents/Footer";

function Homepage() {
  return (
    <div className="App">
      <Header />
      <main>
        <div className="homepage-main-container">
          <div className="homepage-main-text u-center-text u-margin-top-medium">
            <h1>Welcome to TidyApp!</h1>
            <p className="text-purple text-bold u-margin-top-small u-margin-bottom-small">
              Keep your house clean and your roomies happy
            </p>
            <p className="text-bold">
              An easy tool to keep your house clean and organised.
            </p>
          </div>
          <div className="homepage-main-image-container">
            <img
              src={homepageMainImg}
              alt="people in a tidy room"
              className="homepage-main-image"
            />
          </div>
        </div>
        <div className="homepage-main-container">
          <div className="home-card-container">
            <img
              className="homepage-main-image"
              src={lunchBreackMonochromatic}
              alt="people having lunch"
            />
            <div>
              <h2 className="u-margin-top-medium u-margin-bottom-small u-center-text">
                What to expect from TidyApp?
              </h2>
              <ul>
                <li>
                  <p>
                    a <span>HAPPY</span> house
                  </p>
                </li>
                <li>
                  <p>
                    <span>HAPPY</span> relationships
                  </p>
                </li>
                <li>
                  <p>
                    a <span>HAPPY</span> pocket
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="homepage-main-container">
          <div className="text-container">
            <h2 className="u-center-text u-margin-bottom-medium">
              How to achieve happiness with TidyApp?
            </h2>
            <p className="card-up">Create a group</p>
            <p className="card-down">Add your roomies</p>
            <p className="card-up">Add tasks</p>
            <p className="card-down">Program the frequency</p>
            <p className="card-up">Easy peasy!</p>
          </div>
          <img
            className="homepage-main-image u-margin-top-medium u-margin-bottom-big"
            src={teamWorkMonochromatic}
            alt="peoplesolving a puzzle"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Homepage;
