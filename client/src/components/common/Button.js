import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Button = props => {
  const {
    children,
    clickOrTo,
    icon,
    iconSide = "left",
    confirmItem = null,
    value = null,
    pulse = false,
    type = "button",
    classes = []
  } = props;
  const className = `btn waves-effect waves-light ${classes.join(" ")} ${
    pulse ? "pulse" : ""
  }`;

  return type === "link" ? (
    <Link className={className} to={clickOrTo}>
      {icon ? <i className={`material-icons ${iconSide}`}>{icon}</i> : ""}
      {children}
    </Link>
  ) : (
    <button
      type={type}
      className={className}
      onClick={clickOrTo}
      value={value}
      data-confirm-item={confirmItem}
    >
      {icon ? <i className={`material-icons ${iconSide}`}>{icon}</i> : ""}
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  iconSide: PropTypes.string,
  classes: PropTypes.array,
  svgClasses: PropTypes.array,
  clickOrTo: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.string,
  value: PropTypes.any,
  confirmItem: PropTypes.string,
  pulse: PropTypes.bool
};

export default Button;
