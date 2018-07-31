import React, { Component } from "react";
import { connect } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import PropTypes from "prop-types";
import { setCurrentPlace } from "../../actions/placeActions";

class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      place: {
        address: "",
        suggestion: "",
        place_id: "",
        latLng: {}
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
          <label htmlFor="find-a-place">Find a Place</label>
          <input
            id="find-a-place"
            {...getInputProps({
              placeholder: "Search for a place",
              className: inputClass
            })}
          />
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
  setCurrentPlace: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace
});

export default connect(
  mapStateToProps,
  { setCurrentPlace }
)(LocationSearchInput);
