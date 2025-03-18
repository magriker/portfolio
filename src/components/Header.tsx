import "../App.css";
import Label from "./Label";
import Tab from "./Tab";
import "../Header.css";

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
        <nav className="navigation">
          <Tab
            tabs={[
              { key: 1, value: "work" },
              { key: 2, value: "about" },
              { key: 3, value: "content" },
            ]}
          ></Tab>
        </nav>
        <div className="language-box">
          <button className="english-btn">
            <Label size="s" bold>
              EN
            </Label>
          </button>
          <button className="japanese-btn">
            <Label size="s" bold>
              JP
            </Label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
