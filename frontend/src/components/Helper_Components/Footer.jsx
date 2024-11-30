import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <p className="footerP">Készítette:</p>
        <div className="nameCard">
          <a
            href="https://github.com/OsziBen"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Bence
            <img
              className="footer-icon"
              src="/githubicon.png"
              alt="Github Icon"
            />
          </a>
        </div>
        <div className="nameCard">
          <a
            href="https://github.com/GergelyKN"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Gergely
            <img
              className="footer-icon"
              src="/githubicon.png"
              alt="Github Icon"
            />
          </a>
        </div>
        <div className="nameCard">
          <a
            href="https://github.com/Abaku009"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Szabolcs
            <img
              className="footer-icon"
              src="/githubicon.png"
              alt="Github Icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
