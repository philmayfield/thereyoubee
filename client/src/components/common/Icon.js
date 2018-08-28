import React from "react";
import PropTypes from "prop-types";
import { lightColors } from "../../common/getTextColor";

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

const PlaceIcon = props => {
  const { color, classes = [] } = props;
  const isLightColor = lightColors.includes(color);
  const newClasses = [
    isLightColor ? "place-icon-light" : "place-icon",
    ...classes
  ];

  return Icon({ name: "place", classes: newClasses, color });
};

Icon.propTypes = {
  classes: PropTypes.array,
  color: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default Icon;
export { PlaceIcon };
