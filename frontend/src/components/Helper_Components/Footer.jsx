// function Footer() {
//   return (
//     <footer>
//       <div className="links">
//         <p>Készítette </p>
//         <div className="nameCard">
//           <a
//             href="https://github.com/OsziBen"
//             target="blank"
//             rel="noopener noreferrer"
//           >
//             Bence
//             <img id="githubIcon" src="/githubicon.png" alt="Github Icon" />
//           </a>
//         </div>
//         <div className="nameCard">
//           <a
//             href="https://github.com/GergelyKN"
//             target="blank"
//             rel="noopener noreferrer"
//           >
//             Gergely
//             <img id="githubIcon" src="/githubicon.png" alt="Github Icon" />
//           </a>
//         </div>
//         <div className="nameCard">
//           <a
//             href="https://github.com/Abaku009"
//             target="blank"
//             rel="noopener noreferrer"
//           >
//             Szabolcs
//             <img id="githubIcon" src="/githubicon.png" alt="Github Icon" />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }
// export default Footer;

import "./NavBarFooter.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <p>Készítette:</p>
        <div className="nameCard">
          <a
            href="https://github.com/OsziBen"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Bence
            <img
              id="githubIcon"
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
              id="githubIcon"
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
              id="githubIcon"
              className="footer-icon"
              src="/githubicon.png"
              alt="Github Icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
