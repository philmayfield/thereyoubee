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

    this.props.saveCurrentPlace(newPlace);
  }

  render() {
    const { currentPlace, places } = this.props;
    const {
      address,
      suggestion,
      place_id
      // latLng
    } = currentPlace;
    const showComponent = notEmpty(place_id);
    const alreadyHavePlace = notEmpty(
      places.find(place => place.place_id === place_id)
    );

    return (
      <div className={showComponent ? "add-current-place" : "hide"}>
        <h2>Current Place</h2>
        <div>{address}</div>
        <div>{suggestion}</div>
        <div>{place_id}</div>
        {alreadyHavePlace ? (
          <div className="red-text">Already have it</div>
        ) : (
          <Button clickOrTo={this.handleAddPlace} value={currentPlace}>
            Add This Place
          </Button>
        )}
      </div>
    );
  }
}

AddCurrentPlace.propTypes = {
  places: PropTypes.array.isRequired,
  currentPlace: PropTypes.object.isRequired,
  saveCurrentPlace: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace,
  places: state.places
});

export default connect(
  mapStateToProps,
  { saveCurrentPlace }
)(AddCurrentPlace);
