import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import PropTypes from "prop-types";
import { setCurrentPlace, resetCurrentPlace } from "../../actions/placeActions";
import totalPlaces from "../../common/totalPlaces";

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // hasFocus: false,
      address: "",
      findPlaceInput: "",
      place: {
        address: "",
        suggestion: "",
        place_id: "",
        latLng: {}
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleFocus = this.handleFocus.bind(this);
    // this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(address) {
    this.setState({ address });
  }

  handleSelect(address, place_id) {
    const suggestion = address.split(",")[0] || "";

    geocodeByAddress(address)
      .then(results => {
        this.setState({
          address: "",
          place: {
            ...this.state.place,
            place_id,
            suggestion,
            address: results[0].formatted_address
          }
        });
        return getLatLng(results[0]);
      })
      .then(latLng => {
        this.setState({
          place: {
            ...this.state.place,
            latLng
          }
        });
      })
      .then(() => {
        this.props.setCurrentPlace(this.state.place);
      })
      .catch(error => console.log("Error", error));
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (!e.target.value.length) {
      this.resetCurrentPlace();
    }
  }

  // handleFocus() {
  //   this.setState({ hasFocus: true });
  // }

  // handleBlur() {
  //   const { findPlaceInput } = this.state;
  //   if (!findPlaceInput.length) {
  //     this.setState({ hasFocus: false });
  //   }
  // }

  resetCurrentPlace() {
    this.setState({
      address: "",
      place: {
        address: "",
        suggestion: "",
        place_id: "",
        latLng: {}
      }
    });
    if (this.props.currentPlace.place_id) {
      this.props.resetCurrentPlace();
    }
  }

  render() {
    const { places } = this.props;
    const placeholderText = `Find a Place - ${totalPlaces(places.length)}`;
    const renderFunc = ({
      getInputProps,
      getSuggestionItemProps,
      suggestions,
      loading
    }) => {
      const inputClass = `suggestion__input floating-input browser-default ${
        suggestions.length ? "suggestion__input--open" : ""
      }`;

      return (
        <div className="suggestion__root z-depth-1">
          <label className="sr-only" htmlFor="find-a-place">
            Find a Place
          </label>
          <input
            id="find-a-place"
            onFocusCapture={this.handleFocus}
            onBlurCapture={this.handleBlur}
            name="findPlaceInput"
            value={this.state.findPlaceInput}
            onChangeCapture={this.handleInputChange}
            placeholder={placeholderText}
            {...getInputProps({
              className: inputClass
            })}
          />
          <div className="suggestion__dropdown-container">
            {loading && (
              <div className="suggestion__loading">
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              </div>
            )}
            {suggestions.map(suggestion => {
              const className = `suggestion__item ${
                suggestion.active ? "suggestion__item--active" : ""
              }`;
              return (
                <div
                  key={suggestion.id}
                  {...getSuggestionItemProps(suggestion, { className })}
                >
                  <i className={`material-icons place-icon mr-3`}>place</i>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {renderFunc}
      </PlacesAutocomplete>
    );
  }
}

LocationSearchInput.propTypes = {
  places: PropTypes.array.isRequired,
  currentPlace: PropTypes.object.isRequired,
  setCurrentPlace: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace,
  places: state.places
});

export default connect(
  mapStateToProps,
  { setCurrentPlace, resetCurrentPlace }
)(LocationSearchInput);
