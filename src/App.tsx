import "./App.css";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sorting from "./components/Sorting";

function App() {
  return (
    <>
      <div className="container">
        <Header></Header>
        <Sorting></Sorting>
        <About></About>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
