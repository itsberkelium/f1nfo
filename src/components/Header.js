import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="row">
      <div className="col-12 d-flex flex-column align-items-center">
        <h1 className="app--title text-uppercase">
          <Link to="/">F1nfo</Link>
        </h1>
        <h3 className="app--subtitle text-muted text-uppercase">
          <Link to="/"> Your F1 info!</Link>
        </h3>
      </div>
    </div>
  );
};

export default Header;
