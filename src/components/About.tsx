import Label from "./Label";
import "../styles/About.css";
import { useTranslation } from "react-i18next";

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
                {t("exchangeSemester")}
                <br />
              </Label>
              <Label size="s">
                {t("artUniForexchangesemester")}
                <br />
              </Label>
            </div>
          </div>
          <div className="Bachelor-box">
            <img src="/circle.png" alt="circle" className="circle" />
            <div className="Bachelor-title">
              <Label size="s" bold>
                {t("bachelorIt")}
                <br />
              </Label>
              <Label size="s">
                {t("uniforIt")}
                <br />
                <br />
              </Label>
              <Label size="s" bold>
                {t("exchangeSemester")}
                <br />
              </Label>
              <Label size="s">
                {t("itUniforexchangesemester")}
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
