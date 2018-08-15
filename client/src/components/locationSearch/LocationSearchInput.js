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
    this.textInput = React.createRef();
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
  }

  handleChange(address) {
    this.setState({ address });
  }

  handleSelect(address, place_id) {
    const suggestion = address.split(",")[0] || "";
    // blur the text input to ditch the on screen keyboard for mobile
    this.textInput.current.blur();

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
    this.props.resetCurrentPlace();
  }

  render() {
    const { numPlaces, isLoading } = this.props;
    const placeholderText = `Find a Place - ${totalPlaces(
      numPlaces,
      isLoading
    )}`;
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
        <div className="suggestion__root z-depth-2">
          <label className="sr-only" htmlFor="find-a-place">
            Find a Place
          </label>
          <input
            id="find-a-place"
            ref={this.textInput}
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
  isLoading: PropTypes.bool.isRequired,
  setCurrentPlace: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired,
  numPlaces: PropTypes.number.isRequired,
  currentPlace: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace
});

export default connect(
  mapStateToProps,
  { setCurrentPlace, resetCurrentPlace }
)(LocationSearchInput);
