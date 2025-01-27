import Label from "./Label";
import "../About.css";

const About = () => {
  return (
    <>
      <div className="chatchphrase-box">
        <img
          src="public\Portrait.png"
          alt="Portrait"
          className="portrait"
        ></img>
        <div className="chatchprase">
          <Label size="l">
            “I want my work to be meaningful and helpful for people in every day
            life.”
          </Label>
        </div>
      </div>
      <div className="workExperience"></div>
      <div className="education"></div>
    </>
  );
};

export default About;
