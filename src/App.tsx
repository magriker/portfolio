import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sorting from "./components/Sorting";

function App() {
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

export default App;
