import "../App.css";
import "../Footer.css";
import Label from "./Label";

const Footer = () => {
  return (
    <footer>
      <div className="contact-box">
        <Label size="l" bold>
          <p>Let's Talk</p>
        </Label>
        <Label size="l">
          <p>charlotte@traumfabrikat.de</p>
          <p>+818075853392</p>
        </Label>
      </div>
      <div className="snsAndportfolio-box">
        <div className="socialMeia-icons">
          <img
            src="/LinkedIn_Icon.png "
            alt="linkedinicon"
            className="icon"
          ></img>
          <img
            src="/Instagram_icon.png "
            alt="Instagramicon"
            className="icon"
          ></img>
          <img src="/Github_icon.png" alt="Githubicon" className="icon"></img>
          <img src="/Figma_icon.png " alt="Figmaicon" className="icon"></img>
        </div>
        <div className="portfolio-box">
          <img src="/qrcode.png" alt="qrcode" className="qrpic" />
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
