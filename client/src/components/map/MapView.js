import React from "react";
import PropTypes from "prop-types";
import LocationSearchInput from "../locationSearch/LocationSearchInput";
import AddCurrentPlace from "../currentPlace/AddCurrentPlace";
import Map from "./Map";

const MapView = props => {
  const {
    isLoading,
    isAuth,
    places,
    currentPlace,
    lists,
    currentList,
    showTopNav,
    setShowTopNav
  } = props;

  return (
    <div className="map-view" key="map-view">
      <h2 className="sr-only">Map View</h2>
      <Map
        currentPlace={currentPlace}
        places={places}
        setShowTopNav={setShowTopNav}
      />
      <LocationSearchInput
        isLoading={isLoading}
        numPlaces={places.length}
        showTopNav={showTopNav}
        currentPlace={currentPlace}
        currentList={currentList}
      />
      <AddCurrentPlace
        isAuth={isAuth}
        places={places}
        currentPlace={currentPlace}
        lists={lists}
        currentList={currentList}
      />
    </div>
  );
};

MapView.propTypes = {
  places: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  isAuth: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  showTopNav: PropTypes.bool.isRequired,
  setShowTopNav: PropTypes.func.isRequired,
  currentPlace: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired
};

export default MapView;
