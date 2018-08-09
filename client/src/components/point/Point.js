import React from "react";
import PropTypes from "prop-types";
import getImg from "../../common/getImg";
import ReactSVG from "react-svg";

const Point = props => {
  return (
    <div className="map-point">
      <i className={`map-point__icon material-icons red-text`}>place</i>
      <span className="map-point__text z-depth-1">{props.text}</span>
    </div>
  );
};

Point.propTypes = {
  text: PropTypes.string
};

export default Point;
