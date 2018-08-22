import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";
import Button from "../common/Button";
import Icon from "../common/Icon";
import AddEditLists from "../lists/AddEditLists";
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
    // show the component if currentPlace has been set
    if (hasCurrentPlace && !prevState.show) {
      this.setState({ show: true });
    }
    // hide the component if currentPlace has been removed
    if (!hasCurrentPlace && prevState.show) {
      this.setState({ show: false });
    }
  }

  handleAddPlace() {
    const { currentPlace, currentList } = this.props;
    const newPlace = {
      ...currentPlace,
      ...currentPlace.latLng,
      list_id: currentList._id
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
    const {
      isAuth,
      currentPlace,
      places,
      currentList,
      lists,
      errors
    } = this.props;
    const { address, suggestion, place_id } = currentPlace;
    const { show } = this.state;
    const listName = notEmpty(currentList) ? currentList.name : "Default list";
    const hasAnIssue = notEmpty(errors) && errors.status !== 404;
    const storePlace = places.find(place => place.place_id === place_id);
    const hasStorePlace = notEmpty(storePlace);
    const storePlaceList =
      hasStorePlace && lists.find(list => list._id === storePlace.list_id);
    const hasStorePlaceList = notEmpty(storePlaceList);
    const isOnUnknownList = hasStorePlace && !hasStorePlaceList;
    const showMessage = !isAuth || hasAnIssue;
    const whatsTheProb =
      showMessage && !isAuth ? (
        <Fragment>
          Please <Link to="/login">log in</Link> or{" "}
          <Link to="/register">make an account</Link> to save places.
        </Fragment>
      ) : (
        "We couldnt get your list of places, go ahead and try reloading the page and finding the place again please."
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
          <p className="mt-0 mb-1 truncate">{address}</p>
          {showMessage ? (
            <p className="m-0">{whatsTheProb}</p>
          ) : (
            <Fragment>
              {isOnUnknownList ? (
                <p className="red-text">
                  This place was saved to a list but that list has been removed.
                </p>
              ) : (
                <small className="d-flex mb-3 align-items-baseline">
                  {storePlaceList
                    ? "Already on the list:"
                    : "Adding to the list:"}
                  <strong className="ml-1 mr-2">
                    {storePlaceList ? storePlaceList.name : listName}
                  </strong>
                  <AddEditLists lists={lists} />
                </small>
              )}
              <div className="right-align">
                <Button
                  clickOrTo={this.handleClose}
                  classes={["btn-flat", "red-text"]}
                >
                  Close
                </Button>
                {hasStorePlace ? null : (
                  <Button
                    clickOrTo={this.handleAddPlace}
                    value={currentPlace}
                    classes={["ml-3"]}
                    icon="add_circle"
                  >
                    Add This Place
                  </Button>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </CSSTransition>
    );
  }
}

AddCurrentPlace.propTypes = {
  places: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  isAuth: PropTypes.bool.isRequired,
  saveCurrentPlace: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired,
  currentPlace: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { saveCurrentPlace, resetCurrentPlace }
)(AddCurrentPlace);
