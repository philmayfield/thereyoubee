import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Icon from "../common/Icon";
import AddEditLists from "../lists/AddEditLists";
import { notEmpty } from "../../common/empty";

const CurrentPlace = props => {
  const {
    isAuth,
    currentPlace,
    places,
    currentList,
    lists,
    errors,
    handleAddPlace,
    handleClose
  } = props;
  const { address, suggestion, place_id } = currentPlace;
  const hasAnIssue = notEmpty(errors) && errors.status !== 404;
  const storePlace = places.find(place => place.place_id === place_id);
  const hasStorePlace = notEmpty(storePlace);
  const storePlaceList =
    hasStorePlace && lists.find(list => list._id === storePlace.list_id);
  const hasStorePlaceList = notEmpty(storePlaceList);
  const isOnUnknownList = hasStorePlace && !hasStorePlaceList;
  const listName = hasStorePlaceList
    ? storePlaceList.name
    : notEmpty(currentList)
      ? currentList.name
      : "Default List";
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
              {storePlaceList ? "Already on the list:" : "Adding to the list:"}
              <strong className="ml-1 mr-2">{listName}</strong>
              <AddEditLists lists={lists} />
            </small>
          )}
          <div className="right-align">
            <Button clickOrTo={handleClose} classes={["btn-flat", "red-text"]}>
              Close
            </Button>
            {hasStorePlace ? null : (
              <Button
                clickOrTo={handleAddPlace}
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
  );
};

CurrentPlace.propTypes = {
  places: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  isAuth: PropTypes.bool.isRequired,
  savePlace: PropTypes.func.isRequired,
  handleAddPlace: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired,
  currentPlace: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default CurrentPlace;
