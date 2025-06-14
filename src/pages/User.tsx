import "../styles/App.css";
// import "@/styles/App.css";
import About from "../components/users/About";
import Footer from "../components/users/Footer";
import Header from "../components/users/Header";
import Sorting from "../components/users/Sorting";

function User() {
  const handleScroll = (sectionName: string): void => {
    const element = document.getElementById(sectionName + "-section");
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="app-container">
        <div className="header-section">
          <Header onScroll={handleScroll}></Header>
        </div>
        <div id="work-section">
          <Sorting></Sorting>
        </div>
        <div id="about-section">
          <About></About>
        </div>
        <div id="contact-section">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export default User;
