import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { resetCurrentPlace } from "../../actions/placeActions";

class List extends Component {
  componentDidMount() {
    this.props.resetCurrentPlace();
  }

  render() {
    const { places = [], lists = [] } = this.props;
    const placeItems = places.map(place => {
      const list = lists.find(list => list._id === place.list_id);
      return <ListItem key={place._id} item={place} list={list && list.name} />;
    });

    return <div className="list-view__holder px-3">{placeItems}</div>;
  }
}

List.propTypes = {
  places: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired
};

export default connect(
  null,
  { resetCurrentPlace }
)(List);
