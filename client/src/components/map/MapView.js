import React from "react";
import PropTypes from "prop-types";
import LocationSearchInput from "../locationSearch/LocationSearchInput";
import AddCurrentPlace from "../currentPlace/AddCurrentPlace";
import Map from "./Map";

const MapView = props => {
  const { isLoading, places } = props;
  return (
    <div className="map-view" key="map-view">
      <h2 className="sr-only">Map View</h2>
      <Map places={places} />
      <LocationSearchInput isLoading={isLoading} numPlaces={places.length} />
      <AddCurrentPlace places={places} />
    </div>
  );
};

MapView.propTypes = {
  isLoading: PropTypes.bool,
  places: PropTypes.array.isRequired
};

export default MapView;
