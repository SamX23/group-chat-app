import React from "react";

const Footer = () => {
  return (
    <footer>
      <p className="footer__text">
        Made with{" "}
        <span role="img" aria-label="love">
          ♥️
        </span>{" "}
        by
        <a href="https://samx23.github.io"> Sami Kalammallah</a> ©{" "}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
