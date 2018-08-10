import React, { Fragment } from "react";
import PropTypes from "prop-types";

const TotalPlaces = ({ number = 0 }) => (
  <Fragment>
    {number === 0 ? "No " : `${number} `}
    place
    {number > 1 || number === 0 ? "s " : " "}
    on the list
  </Fragment>
);

TotalPlaces.propTypes = {
  number: PropTypes.number,
  classes: PropTypes.string
};

export default TotalPlaces;
