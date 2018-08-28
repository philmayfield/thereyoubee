import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ListColor = props => {
  const { color, selectFn, listColor = "teal" } = props;

  return (
    <Fragment>
      <input
        type="radio"
        name="list-color"
        id={`lc-${color}`}
        value={color}
        defaultChecked={color === listColor}
        onClick={selectFn}
      />
      <label htmlFor={`lc-${color}`} className={`${color} cursor-pointer`}>
        <span className="sr-only">{color}</span>
      </label>
    </Fragment>
  );
};

ListColor.propTypes = {
  selectFn: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  listColor: PropTypes.string
};

export default ListColor;
