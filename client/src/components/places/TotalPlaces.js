import React from "react";
import PropTypes from "prop-types";

const TotalPlaces = ({ number = 0, classes = "" }) => {
  return (
    <div className={`total-places ${classes}`}>
      {number === 0 ? "No " : `${number} `}
      place
      {number > 1 || number === 0 ? "s " : " "}
      on the list
    </div>
  );
};

TotalPlaces.propTypes = {
  number: PropTypes.number,
  classes: PropTypes.string
};

export default TotalPlaces;
