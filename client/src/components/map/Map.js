import React, { Component } from "react";
import { connect } from "react-redux";
import { notEmpty } from "../../common/empty";
import PropTypes from "prop-types";
import GoogleMapReact from "google-map-react";
import Point from "../point/Point";
import { fitBounds } from "google-map-react/utils";

class PlacesMap extends Component {
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
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  getCurrentPlace(currentPlace) {
    const { address, place_id, latLng } = this.props.currentPlace;
    const hasCurrentPlace =
      notEmpty(address) || notEmpty(place_id) || notEmpty(latLng);

    return {
      hasCurrentPlace,
      currentPlace: currentPlace
    };
  }

  makeBounds(placesArr) {
    if (!placesArr.length) return null;

    const lats = [];
    const lngs = [];

    placesArr.forEach(({ latLng }) => {
      lats.push(latLng.lat);
      lngs.push(latLng.lng);
    });

    lats.sort();
    lngs.sort();

    return {
      nw: {
        lat: lats[lats.length - 1],
        lng: lngs[0]
      },
      se: {
        lat: lats[0],
        lng: lngs[lngs.length - 1]
      }
    };
  }

  makePoints(placesArr) {
    return placesArr.map(place => (
      <Point
        key={place.place_id || place.address}
        lat={place.latLng.lat}
        lng={place.latLng.lng}
        text={place.suggestion}
      />
    ));
  }

  render() {
    const { hasCurrentPlace, currentPlace } = this.getCurrentPlace(
      this.props.currentPlace
    );
    const placesArr = hasCurrentPlace ? [currentPlace] : [];
    const points = this.makePoints(placesArr);
    let centerZoom = {
      center: {
        lat: 39.09596,
        lng: -95.88867
      },
      zoom: 4
    };

    console.log("hasCurrentPlace", hasCurrentPlace);

    if (hasCurrentPlace) {
      centerZoom = {
        center: {
          lat: currentPlace.latLng.lat,
          lng: currentPlace.latLng.lng
        },
        zoom: 15
      };
    } else if (placesArr.length) {
      const widthHeight = {
        width: this.state.width,
        height: this.state.height
      };
      const bounds = this.makeBounds(placesArr);
      centerZoom = bounds && fitBounds(bounds, widthHeight);
      console.log("widthHeight", widthHeight);
      console.log("bounds", bounds);
    }

    console.log("points", points);
    console.log("centerZoom", centerZoom);

    return (
      <div style={{ height: "70vh", width: "100%" }}>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          center={centerZoom.center}
          zoom={centerZoom.zoom}
        >
          {points}
        </GoogleMapReact>
      </div>
    );
  }
}

PlacesMap.propTypes = {
  currentPlace: PropTypes.object.isRequired,
  text: PropTypes.string
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace
});

export default connect(
  mapStateToProps,
  {}
)(PlacesMap);
