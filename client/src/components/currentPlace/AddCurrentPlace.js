import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";
import Button from "../common/Button";
import { saveCurrentPlace } from "../../actions/placeActions";

class AddCurrentPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleAddPlace = this.handleAddPlace.bind(this);
  }

  handleAddPlace(e) {
    e.preventDefault();

    const { currentPlace } = this.props;

    const newPlace = {
      ...currentPlace,
      ...currentPlace.latLng
    };
    delete newPlace.latLng;
    console.log("currentPlace", currentPlace);
    console.log("newPlace", newPlace);

    this.props.saveCurrentPlace(newPlace);
  }

  render() {
    const { currentPlace } = this.props;
    const { address, suggestion, place_id, latLng } = currentPlace;
    const showComponent =
      notEmpty(address) || notEmpty(place_id) || notEmpty(latLng);
    return (
      <div className={showComponent ? "add-current-place" : "hide"}>
        <h2>Current Place</h2>
        <div>{address}</div>
        <div>{suggestion}</div>
        <div>{place_id}</div>
        <Button clickOrTo={this.handleAddPlace} value={currentPlace}>
          Add This Place
        </Button>
      </div>
    );
  }
}

AddCurrentPlace.propTypes = {
  currentPlace: PropTypes.object.isRequired,
  saveCurrentPlace: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace
});

export default connect(
  mapStateToProps,
  { saveCurrentPlace }
)(AddCurrentPlace);
