import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";
import Button from "../common/Button";
import {
  saveCurrentPlace,
  resetCurrentPlace
} from "../../actions/placeActions";
import { CSSTransition } from "react-transition-group";

class AddCurrentPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.handleAddPlace = this.handleAddPlace.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPlace } = this.props;
    if (notEmpty(currentPlace.place_id) && !prevState.show) {
      this.setState({ show: true });
    }
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

    this.handleClose();
  }

  handleClose() {
    this.setState({ show: false });
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
    const { show } = this.state;
    const gotAnIssue = notEmpty(errors);
    const alreadyHavePlace = notEmpty(
      places.find(place => place.place_id === place_id)
    );

    return (
      <CSSTransition in={show} timeout={0} classNames="growFade" unmountOnExit>
        <div className="add-current-place z-depth-3">
          <h2 className="sr-only">Current Place</h2>
          <div className="add-current-place__place-name">
            <i className={`material-icons place-icon mr-2`}>place</i>
            {suggestion}
          </div>
          <hr />
          <p className="mt-0">{address}</p>
          {gotAnIssue ? (
            <div className="red-text">
              We couldnt get your list of places, go ahead and try reloading the
              page and finding it again please.
            </div>
          ) : (
            <div className="right-align">
              <Button
                clickOrTo={this.handleClose}
                classes={["btn-flat", "red-text", "mr-3"]}
              >
                Close
              </Button>
              {alreadyHavePlace ? (
                <span className="teal-text">Already have it</span>
              ) : (
                <Button
                  clickOrTo={this.handleAddPlace}
                  value={currentPlace}
                  icon="add_circle"
                >
                  Add This Place
                </Button>
              )}
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
