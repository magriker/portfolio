import "../App.css";
import "../Footer.css";
import Label from "./Label";

const Footer = () => {
  return (
    <footer>
      <div className="contact-box">
        <Label size="l" bold>
          Let's Talk
          <br />
        </Label>
        <Label size="l">
          charlotte@traumfabrikat.de
          <br />
          +818075853392
        </Label>
      </div>
      <div className="snsAndportfolio-box">
        <div className="socialMeia-icons">
          <img
            src=" public\LinkedIn_Icon.png "
            alt="linkedinicon"
            className="icon"
          ></img>
          <img
            src=" public\Instagram_icon.png "
            alt="Instagramicon"
            className="icon"
          ></img>
          <img
            src=" public\Github_icon.png"
            alt="Githubicon"
            className="icon"
          ></img>
          <img
            src=" public\Figma_icon.png "
            alt="Figmaicon"
            className="icon"
          ></img>
        </div>
        <div className="portfolio-box">
          <img src="public\qrcode.png" alt="qrcode" className="qrpic" />
          <div className="portfoliotext-box">
            <Label size="s" bold>
              download my portfolio
            </Label>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
