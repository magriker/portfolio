import "../App.css";

const Footer = () => {
  return (
    <footer>
      <div className="snsAndportfolio-box">
        <div className="socialMeia-icons">
          <img src=" public\LinkedIn_Icon.png " alt="linkedinicon"></img>
          <img src=" public\Instagram_icon.png " alt="Instagramicon"></img>
          <img src=" public\Github_icon.png" alt="Githubicon"></img>
          <img src=" public\Figma_icon.png " alt="Figmaicon"></img>
        </div>
        <div className="portfolio-box">
          <img src="public\qrcode.png" alt="qrcode" className="qrpic" />
          <p className="portfoliotext-box">download my portfolio</p>
        </div>
      </div>
      <div className="contact-box">
        <p className="catchphrase">Let's Talk</p>
        <p className="email">charlotte@traumfabrikat.de</p>
        <p className="phon-number">+818075853392</p>
      </div>
    </footer>
  );
};

export default Footer;
