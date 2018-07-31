import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";
import Button from "../common/Button";

class AddCurrentPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { address, suggestion, place_id, latLng } = this.props.currentPlace;
    const showComponent =
      notEmpty(address) || notEmpty(place_id) || notEmpty(latLng);
    return (
      <div className={showComponent ? "add-current-place" : "hidden"}>
        <h2>Current Place</h2>
        <div>{address}</div>
        <div>{suggestion}</div>
        <div>{place_id}</div>
        <Button>Add This Place</Button>
      </div>
    );
  }
}

AddCurrentPlace.propTypes = {
  currentPlace: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace
});

export default connect(
  mapStateToProps,
  {}
)(AddCurrentPlace);
