import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from 'prop-types';
import LocationSearchInput from "../locationSearch/LocationSearchInput";
import AddCurrentPlace from "../currentPlace/AddCurrentPlace";
import Map from "./Map";

class MapView extends Component {
  render() {
    return (
      <div className="map-view" key="map-view">
        <h2>Map View</h2>
        <LocationSearchInput />
        <AddCurrentPlace />
        <Map />
      </div>
    );
  }
}

// MapView.propTypes = {
//   something: PropTypes.string.isRequired
// }

export default MapView;
