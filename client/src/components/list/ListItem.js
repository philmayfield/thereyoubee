import React from "react";
import PropTypes from "prop-types";

const ListItem = props => {
  const {
    // place_id,
    // author,
    address,
    // date,
    suggestion
    // latLng = {}
  } = props.item;
  // const { lat, lng } = latLng;

  return (
    <div className="collection-item avatar">
      <i className="circle green">A</i>
      <span className="title">{suggestion}</span>
      <p>{address}</p>
      {/* ({lat}, {lng}) */}
    </div>
  );
};

ListItem.propTypes = {
  place_id: PropTypes.string,
  author: PropTypes.string,
  address: PropTypes.string,
  date: PropTypes.string,
  suggestion: PropTypes.string,
  latLng: PropTypes.object,
  item: PropTypes.object
};

export default ListItem;
