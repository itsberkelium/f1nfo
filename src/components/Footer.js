import React from "react";

const Footer = () => {
  return (
    <footer className="mt-5 d-flex justify-content-end align-items-center">
      <p className="small text-muted">
        Made with{" "}
        <span role="img" aria-label="flag">
          🖤
        </span>{" "}
        by{" "}
        <a
          href="https://berke.xyz"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "underline" }}
        >
          Berke Sutcu
        </a>
      </p>
    </footer>
  );
};

export default Footer;
