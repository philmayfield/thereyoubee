import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllPlaces } from "../../actions/placeActions";
import LocationSearchInput from "../locationSearch/LocationSearchInput";
import AddCurrentPlace from "../currentPlace/AddCurrentPlace";
import Map from "./Map";

class MapView extends Component {
  componentDidMount() {
    this.props.getAllPlaces();
  }

  render() {
    return (
      <div className="map-view" key="map-view">
        <h2 className="sr-only">Map View</h2>
        <Map />
        <LocationSearchInput />
        <AddCurrentPlace />
      </div>
    );
  }
}

MapView.propTypes = {
  places: PropTypes.array.isRequired,
  getAllPlaces: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  places: state.places
});

export default connect(
  mapStateToProps,
  { getAllPlaces }
)(MapView);
