import React, { Component } from "react";
import { isEmpty, notEmpty } from "../../common/empty";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import ClickablePoint from "../point/ClickablePoint";
import { fitBounds } from "google-map-react/utils";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    this.props.setShowTopNav(true);
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  makeBounds(placesArr) {
    if (isEmpty(placesArr)) return null;

    const lats = [];
    const lngs = [];

    // put lats and lngs for all places in their respective arrays
    placesArr.forEach(({ latLng }) => {
      lats.push(latLng.lat);
      lngs.push(latLng.lng);
    });

    // spreading on Math.max/min can run into a maximum args limit for the js engine, but according to docs, thats well into the tens of thousands, so shouldnt be a problem for this app.
    return {
      nw: {
        lat: Math.max(...lats),
        lng: Math.min(...lngs)
      },
      se: {
        lat: Math.min(...lats),
        lng: Math.max(...lngs)
      }
    };
  }

  makePoints(placesArr) {
    return placesArr.map(place => {
      const list = this.props.lists.find(list => {
        return list._id === place.list_id;
      });
      const color = (list && list.color) || "default";

      return (
        <ClickablePoint
          show={placesArr.length === 1}
          key={place.place_id || place.address}
          lat={place.latLng.lat}
          lng={place.latLng.lng}
          text={place.suggestion}
          color={color}
        />
      );
    });
  }

  createMapOptions(maps) {
    return {
      fullscreenControl: false,
      zoomControl: true,
      // mapTypeControl: true,
      // mapTypeControlOptions: {
      //   style: maps.MapTypeControlStyle.DEFAULT,
      //   position: maps.ControlPosition.BOTTOM_CENTER
      // },
      streetViewControl: true,
      streetViewControlOptions: {
        position: maps.ControlPosition.LEFT_BOTTOM
      }
    };
  }

  render() {
    const { currentPlace, places = [], setShowTopNav } = this.props;
    const hasCurrentPlace = notEmpty(currentPlace.place_id);
    const placesArr = hasCurrentPlace ? [currentPlace] : places;
    const points = this.makePoints(placesArr);
    let centerZoom = {
      // default zoom and center over north america
      center: {
        lat: 39.09596,
        lng: -95.88867
      },
      zoom: 4
    };

    if (hasCurrentPlace || placesArr.length === 1) {
      // has current place or only one place on list - show just that place zoomed in
      const place = hasCurrentPlace ? currentPlace : placesArr[0];

      centerZoom = {
        center: {
          lat: place.latLng.lat,
          lng: place.latLng.lng
        },
        zoom: hasCurrentPlace ? 17 : 10
      };
    } else if (placesArr.length > 1) {
      // no current place, but has more than one item on the list of places - have library make centerZoom
      const widthHeight = {
        width: this.state.width,
        height: this.state.height
      };
      const bounds = this.makeBounds(placesArr);

      centerZoom = bounds && fitBounds(bounds, widthHeight);
    }

    return (
      <div className="the-map">
        <GoogleMapReact
          center={centerZoom.center}
          zoom={centerZoom.zoom}
          options={this.createMapOptions}
          onGoogleApiLoaded={({ map, maps }) => {
            const streetView = map.getStreetView();
            maps.event.addListener(streetView, "visible_changed", () =>
              setShowTopNav(!streetView.visible)
            );
          }}
          yesIWantToUseGoogleMapApiInternals
        >
          {points}
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {
  places: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  setShowTopNav: PropTypes.func.isRequired,
  currentPlace: PropTypes.object.isRequired,
  text: PropTypes.string
};

export default Map;
