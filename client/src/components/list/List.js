import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItem from "./ListItem";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      places
      // auth
    } = this.props;
    const placeItems =
      Array.isArray(places) &&
      places.map(place => {
        return <ListItem key={place._id} item={place} />;
      });

    return <div className="place-list px-3 pb-5">{placeItems}</div>;
  }
}

List.propTypes = {
  places: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(List);
