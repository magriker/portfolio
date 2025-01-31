import "../App.css";
import Label from "./Label";
import Sortingtag from "./Sortingtag";

const Header = () => {
  return (
    <div className="header-container">
      <div className="intro-box">
        <div className="slogan">
          <Label size="l" bold>
            Hi, I am Sophie Bolinski
            <br />
          </Label>
          <Label size="l">
            an industrial designer
            <br />
            focusing on innovation and
            <br />
            prototyping. Based in Tokyo.
          </Label>
        </div>
        <nav className="navigation"></nav>
        <div className="language-box"></div>
        <Sortingtag
          tabs={[
            { key: 1, value: `all` },
            { key: 2, value: "Product" },
            { key: 3, value: "Packaging" },
            { key: 4, value: "Graphic" },
          ]}
        ></Sortingtag>
      </div>
    </div>
  );
};

export default Header;
