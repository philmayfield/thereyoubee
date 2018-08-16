import React from "react";
import PropTypes from "prop-types";

const Icon = props => {
  const { name = "error", color, classes = [] } = props;

  return (
    <i
      className={`material-icons ${classes.join(" ")} ${
        color ? color + "-text" : ""
      }`}
    >
      {name}
    </i>
  );
};

Icon.propTypes = {
  classes: PropTypes.array,
  color: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Icon;
