import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";
import Button from "../common/Button";
import Icon from "../common/Icon";
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

  componentDidMount() {
    const { currentPlace } = this.props;
    if (notEmpty(currentPlace.place_id)) {
      this.setState({ show: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const hasCurrentPlace = notEmpty(this.props.currentPlace.place_id);
    if (hasCurrentPlace && !prevState.show) {
      this.setState({ show: true });
    }
    if (!hasCurrentPlace && prevState.show) {
      this.setState({ show: false });
    }
  }

  handleAddPlace() {
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
    const { address, suggestion, place_id } = currentPlace;
    const { show } = this.state;
    const gotAnIssue = notEmpty(errors) && errors.status !== 404;
    const alreadyHavePlace = notEmpty(
      places.find(place => place.place_id === place_id)
    );

    return (
      <CSSTransition in={show} timeout={0} classNames="growFade" unmountOnExit>
        <div className="add-current-place z-depth-3">
          <h2 className="sr-only">Current Place</h2>
          <div className="add-current-place__place-name">
            <Icon name={"place"} classes={["place-icon", "mr-2"]} />
            {suggestion}
          </div>
          <hr />
          <p className="mt-0">{address}</p>
          {gotAnIssue ? (
            <div className="red-text">
              We couldnt get your list of places, go ahead and try reloading the
              page and finding the place again please.
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
                <span className="teal-text">On the list!</span>
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
  saveCurrentPlace: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired,
  currentPlace: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { saveCurrentPlace, resetCurrentPlace }
)(AddCurrentPlace);
