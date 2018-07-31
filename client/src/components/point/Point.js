import React from "react";
import PropTypes from "prop-types";
import getImg from "../../common/getImg";
import ReactSVG from "react-svg";

const Point = props => {
  return (
    <div className="map-point">
      <ReactSVG path={getImg("location")} svgClassName="map-icon" />
      {props.text}
    </div>
  );
};

Point.propTypes = {
  text: PropTypes.string
};

export default Point;
