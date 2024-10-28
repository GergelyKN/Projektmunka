function Footer() {
  return (
    <footer>
      <div className="links">
        <p>Készítette </p>
        <div className="nameCard">
          <a
            href="https://github.com/OsziBen"
            target="blank"
            rel="noopener noreferrer"
          >
            Bence
            <img id="githubIcon" src="/githubicon.png" alt="Github Icon" />
          </a>
        </div>
        <div className="nameCard">
          <a
            href="https://github.com/GergelyKN"
            target="blank"
            rel="noopener noreferrer"
          >
            Gergely
            <img id="githubIcon" src="/githubicon.png" alt="Github Icon" />
          </a>
        </div>
        <div className="nameCard">
          <a
            href="https://github.com/Abaku009"
            target="blank"
            rel="noopener noreferrer"
          >
            Szabolcs
            <img id="githubIcon" src="/githubicon.png" alt="Github Icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
