import React from "react";
import PropTypes from "prop-types";
import LocationSearchInput from "../locationSearch/LocationSearchInput";
import AddCurrentPlace from "../currentPlace/AddCurrentPlace";
import Map from "./Map";

const MapView = props => {
  const { isLoading, places, currentPlace, showTopNav, setShowTopNav } = props;
  return (
    <div className="map-view" key="map-view">
      <h2 className="sr-only">Map View</h2>
      <Map places={places} setShowTopNav={setShowTopNav} />
      <LocationSearchInput
        isLoading={isLoading}
        numPlaces={places.length}
        showTopNav={showTopNav}
      />
      <AddCurrentPlace places={places} currentPlace={currentPlace} />
    </div>
  );
};

MapView.propTypes = {
  places: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showTopNav: PropTypes.bool.isRequired,
  setShowTopNav: PropTypes.func.isRequired,
  currentPlace: PropTypes.object.isRequired
};

export default MapView;
