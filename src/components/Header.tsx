import "../styles/App.css";
import Label from "./Label";
import Tab from "./Tab";
import "../styles/Header.css";
import { changeLanguage } from "i18next";
import { Trans, useTranslation } from "react-i18next";
import { useState } from "react";

type HeaderComponentScroll = {
  onScroll: (sectionName: string) => void;
};

const Header = ({ onScroll }: HeaderComponentScroll) => {
  const { t } = useTranslation();
  const [lngButton, setlngButton] = useState("");

  return (
    <div className="header-container">
      <div className="intro-box">
        <div className="slogan">
          <Label size="l" bold>
            {t("headerName")}
            <br />
          </Label>
          <Label size="l">
            <Trans i18nKey="headerIntroduction">
              an industrial designer
              <br />
              focusing on innovation and
              <br />
              prototyping. Based in Tokyo.
            </Trans>
          </Label>
        </div>
        <nav className="navigation">
          <Tab
            tabs={[
              { key: 1, value: "work" },
              { key: 2, value: "about" },
              { key: 3, value: "contact" },
            ]}
            onScroll={onScroll}
          ></Tab>
        </nav>
        <div className="language-box">
          <button
            className={`english-btn ${lngButton === "en" ? "active" : ""}`}
            onClick={() => {
              changeLanguage("en");
              setlngButton("en");
            }}
          >
            EN
          </button>
          <button
            className={`japanese-btn ${lngButton === "jp" ? "active" : ""}`}
            onClick={() => {
              changeLanguage("jp");
              setlngButton("jp");
            }}
          >
            JP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
