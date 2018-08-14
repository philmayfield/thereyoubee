import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { isEmpty, notEmpty } from "../../common/empty";
import Button from "../common/Button";
import {
  saveCurrentPlace,
  resetCurrentPlace
} from "../../actions/placeActions";
import { CSSTransition } from "react-transition-group";

class AddCurrentPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleAddPlace = this.handleAddPlace.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  handleAddPlace(e) {
    e.preventDefault();

    const { currentPlace } = this.props;

    const newPlace = {
      ...currentPlace,
      ...currentPlace.latLng
    };
    delete newPlace.latLng;

    this.props.saveCurrentPlace(newPlace);
  }

  handleClose(e) {
    e.preventDefault();

    this.props.resetCurrentPlace();
  }

  render() {
    const { currentPlace, places, errors } = this.props;
    const {
      address,
      suggestion,
      place_id
      // latLng
    } = currentPlace;
    const showComponent = notEmpty(place_id);
    const showAddBtn = isEmpty(errors);
    const alreadyHavePlace = notEmpty(
      places.find(place => place.place_id === place_id)
    );

    return (
      <CSSTransition in={showComponent} timeout={0} classNames="growFade">
        <div className={showComponent ? "add-current-place z-depth-3" : "hide"}>
          <h2 className="sr-only">Current Place</h2>
          <div className="add-current-place__place-name">
            <i className={`material-icons place-icon mr-2`}>place</i>
            {suggestion}
          </div>
          <hr />
          <p className="mt-0">{address}</p>
          {alreadyHavePlace ? (
            <div className="red-text">Already have it</div>
          ) : showAddBtn ? (
            <div className="right-align">
              <Button
                clickOrTo={this.handleClose}
                classes={["btn-flat", "red-text", "mr-3"]}
              >
                Close
              </Button>
              <Button
                clickOrTo={this.handleAddPlace}
                value={currentPlace}
                icon="add_circle"
              >
                Add This Place
              </Button>
            </div>
          ) : (
            <div className="red-text">
              We couldnt get your list of places, go ahead and try reloading the
              page and finding it again please.
            </div>
          )}
        </div>
      </CSSTransition>
    );
  }
}

AddCurrentPlace.propTypes = {
  places: PropTypes.array.isRequired,
  currentPlace: PropTypes.object.isRequired,
  saveCurrentPlace: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const mapStateToProps = state => ({
  currentPlace: state.currentPlace,
  errors: state.errors,
  places: state.places
});

export default connect(
  mapStateToProps,
  { saveCurrentPlace, resetCurrentPlace }
)(AddCurrentPlace);
