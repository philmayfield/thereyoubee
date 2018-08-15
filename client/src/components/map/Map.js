import React, { Component } from "react";
import { connect } from "react-redux";
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
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  makeBounds(placesArr) {
    if (isEmpty(placesArr)) return null;

    const lats = [];
    const lngs = [];

    placesArr.forEach(({ latLng }) => {
      lats.push(latLng.lat);
      lngs.push(latLng.lng);
    });

    lats.sort((a, b) => a - b);
    lngs.sort((a, b) => a - b);

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
      <ClickablePoint
        show={placesArr.length === 1}
        key={place.place_id || place.address}
        lat={place.latLng.lat}
        lng={place.latLng.lng}
        text={place.suggestion}
      />
    ));
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
    const { currentPlace, places = [] } = this.props;
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
        >
          {points}
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {
  places: PropTypes.array.isRequired,
  currentPlace: PropTypes.object.isRequired,
  text: PropTypes.string
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace
});

export default connect(mapStateToProps)(Map);
