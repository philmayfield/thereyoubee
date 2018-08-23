import React from "react";
import PropTypes from "prop-types";
import ListViewItem from "./ListViewItem";

const List = props => {
  const { places = [], lists = [] } = props;
  const placeItems = places.map(place => {
    const list = lists.find(list => list._id === place.list_id);
    return <ListViewItem key={place._id} item={place} list={list} />;
  });

  return <div className="list-view__holder px-3">{placeItems}</div>;
};

List.propTypes = {
  places: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired
};

export default List;
