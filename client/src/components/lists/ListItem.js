import React from "react";
import PropTypes from "prop-types";

const ListItem = props => {
  const { list } = props;
  return <div>{list.name}</div>;
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired
};

export default ListItem;
