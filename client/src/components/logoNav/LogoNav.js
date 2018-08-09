import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LogoNav = props => {
  const { isAuth } = props;

  return (
    <div className="logo-nav">
      <div className="logo">B</div>
      <nav>
        <Link className="" to="/login">
          Login
        </Link>
        <br />
        <Link className="" to="/map">
          Map
        </Link>
        <br />
        <Link className="" to="/list">
          List
        </Link>
        <br />
        {isAuth ? "👍" : "👎"}
      </nav>
    </div>
  );
};

LogoNav.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default LogoNav;
