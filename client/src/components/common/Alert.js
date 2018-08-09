import React from "react";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";

const Alert = props => {
  const { color = "blue-grey darken-1", textColor = "white" } = props;
  const renderHeading = () => {
    if (notEmpty(props.heading)) {
      return <span className="card-title">{props.heading}</span>;
    }
  };

  return (
    <div className={`card ${color}`} role="alert">
      <div className={`card-content ${textColor}-text`}>
        {renderHeading()}
        {props.children}
      </div>
    </div>
  );
};

Alert.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  heading: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default Alert;
