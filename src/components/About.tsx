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
      <div className="history">
        <div className="workExperience">
          <p>
            <Label size="l" bold>
              Work experience
            </Label>
          </p>
          <Label size="s">
            I worked for several companies in the past, in collaboration for my
            university projects or as a working student, freelancer or intern.
            The companies I worked with are operating in the field of industrial
            design, graphic design or UX/UI design. My most recent work is in
            collaboration with the maritime science museum in Bremerhaven,
            Germany to create an inclusive museum environment. Additionally to
            that am I freelancing for the Tokyo University where I support with
            design research and electronic prototyping.
            <br />
            <br />
          </Label>
          <Label size="s">
            For my whole work experience please visit my LinkedIn profile.
            <br />
            <br />
          </Label>
          <img
            src="public\LinkedIn_Icon.png"
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
            <img src="public\circle.png" alt="circle" className="circle" />
            <div className="Bachelor-title">
              <Label size="s" bold>
                Bachelor in Industrial design
                <br />
              </Label>
              <Label size="s">
                Burg Giebichenstein School of Art and Design Halle
                &#40;Saale&#41;, Germany Graduation 02.2023 <br />
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
            <img src="public\circle.png" alt="circle" className="circle" />
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
