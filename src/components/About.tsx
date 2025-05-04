import Label from "./Label";
import "../About.css";
import { Trans, useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="chatchphrase-box">
        <img src="/Portrait.png" alt="Portrait" className="portrait"></img>
        <div className="chatchprase">
          <Label size="l">{t("chatchPhrase")}</Label>
        </div>
      </div>
      <div className="history">
        <div className="workExperience">
          <p className="subtitle">
            <Label size="l" bold>
              Work experience
            </Label>
          </p>
          <Label size="s">
            {t("workExperience")}
            <br />
            <br />
          </Label>
          <img
            src="/LinkedIn_Icon.png"
            alt="linkedin icon"
            className="linkedin-icon"
          ></img>
        </div>
        <div className="education">
          <p className="subtitle">
            <Label size="l" bold>
              Education
            </Label>
          </p>

          <div className="Bachelor-box">
            <img src="/circle.png" alt="circle" className="circle" />
            <div className="Bachelor-title">
              <Label size="s" bold>
                {t("bachelorIndustrialDesign")}
                <br />
              </Label>
              <Label size="s">
                {t("uniForIndustrialDesign")}
                <br />
                <br />
              </Label>
              <Label size="s" bold>
                Exchange Semester
                <br />
              </Label>
              <Label size="s">
                Tokyo University of the Arts Tokyo, Japan 04.2022 - 10.2022{" "}
                <br />
              </Label>
            </div>
          </div>
          <div className="Bachelor-box">
            <img src="/circle.png" alt="circle" className="circle" />
            <div className="Bachelor-title">
              <Label size="s" bold>
                Bachelor International Media and IT
                <br />
              </Label>
              <Label size="s">
                HTW Berlin Berlin, Germany Graduation 10.2016
                <br />
                <br />
              </Label>
              <Label size="s" bold>
                Exchange Semester
                <br />
              </Label>
              <Label size="s">
                GardyneHolt - practical semester Auckland, New Zealand 09.2014 -
                02.2015
                <br />
              </Label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
