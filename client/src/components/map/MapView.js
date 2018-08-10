import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllPlaces } from "../../actions/placeActions";
import LocationSearchInput from "../locationSearch/LocationSearchInput";
import AddCurrentPlace from "../currentPlace/AddCurrentPlace";
import Map from "./Map";

class MapView extends Component {
  componentDidMount() {
    // get a fresh set of places up front
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
  getAllPlaces: PropTypes.func.isRequired
};

export default connect(
  null,
  { getAllPlaces }
)(MapView);
