import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import PropTypes from "prop-types";
import { setCurrentPlace, resetCurrentPlace } from "../../actions/placeActions";

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
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
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(address) {
    this.setState({ address });
  }

  handleSelect(address, place_id) {
    const suggestion = address.split(",")[0] || "";

    geocodeByAddress(address)
      .then(results => {
        this.setState({
          address,
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

  handleFocus() {
    this.setState({ hasFocus: true });
  }

  handleBlur() {
    const { findPlaceInput } = this.state;
    if (!findPlaceInput.length) {
      this.setState({ hasFocus: false });
    }
  }

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
    console.log(
      ">>",
      this.props.currentPlace.place_id,
      !!this.props.currentPlace.place_id
    );
    if (this.props.currentPlace.place_id) {
      this.props.resetCurrentPlace();
    }
  }

  render() {
    const renderFunc = ({
      getInputProps,
      getSuggestionItemProps,
      suggestions,
      loading
    }) => {
      const inputClass = `suggestion__input ${
        suggestions.length ? "suggestion__input--open" : ""
      }`;

      return (
        <div className="suggestion__root">
          <div className="input-field">
            <input
              id="find-a-place"
              onFocusCapture={this.handleFocus}
              onBlurCapture={this.handleBlur}
              name="findPlaceInput"
              value={this.state.findPlaceInput}
              onChangeCapture={this.handleInputChange}
              {...getInputProps({
                className: inputClass
              })}
            />
            <label
              className={this.state.hasFocus ? "active" : ""}
              htmlFor="find-a-place"
            >
              Find a Place
            </label>
          </div>
          <div className="suggestion__dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = `suggestion__item ${
                suggestion.active ? "suggestion__item--active" : ""
              }`;
              return (
                <div
                  key={suggestion.id}
                  {...getSuggestionItemProps(suggestion, { className })}
                >
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
  currentPlace: PropTypes.object.isRequired,
  setCurrentPlace: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace
});

export default connect(
  mapStateToProps,
  { setCurrentPlace, resetCurrentPlace }
)(LocationSearchInput);
