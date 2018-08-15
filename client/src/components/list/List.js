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
    const {
      // isAuth
      places = []
    } = this.props;
    const placeItems = places.map(place => (
      <ListItem key={place._id} item={place} />
    ));

    return <div className="place-list px-3">{placeItems}</div>;
  }
}

List.propTypes = {
  places: PropTypes.array.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired
  // isAuth: PropTypes.object.isRequired
};

export default connect(
  null,
  { resetCurrentPlace }
)(List);
