import "../App.css";
import Label from "./Label";
import Tab from "./Tab";
import "../Header.css";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="header-container">
      <div className="intro-box">
        <div className="slogan">
          <Label size="l" bold>
            {t("headerIntroduction")}
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
          <button className="english-btn" onClick={() => changeLanguage("en")}>
            EN
          </button>
          <button className="japanese-btn" onClick={() => changeLanguage("jp")}>
            JP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
