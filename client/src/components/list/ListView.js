import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "../common/Alert";
import { notEmpty } from "../../common/empty";
import List from "./List";
import totalPlaces from "../../common/totalPlaces";

const ListView = props => {
  const { isAuth, isLoading, places } = props;
  const hasPlaces = notEmpty(places);
  let content;

  if (hasPlaces && !isLoading) {
    content = <List places={places} />;
  } else if (!isLoading)
    content = (
      <div className="px-3 pt-5">
        <Alert heading="There aren&rsquo;t any places here yet!">
          <p>
            {isAuth ? (
              "Looks like you havent added any places here yet, why don&rsquo;t you flip over to the map view and start adding some!"
            ) : (
              <Fragment>
                How can you have places on your list if you havent logged in?{" "}
                <span role="img" aria-label="thinking face emoji">
                  🤔
                </span>
                Please <Link to="/login">log in</Link> or{" "}
                <Link to="/register">make an account</Link> to save places.
              </Fragment>
            )}
          </p>
        </Alert>
      </div>
    );

  return (
    <div className="list-view">
      <header className="list-view__header z-depth-3 d-flex justify-content-end align-items-center pr-3">
        <h2 className="sr-only">List View</h2>
        <span>{totalPlaces(places.length, isLoading)}</span>
      </header>
      <section className="list-view__list">{content}</section>
    </div>
  );
};

ListView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  places: PropTypes.array.isRequired
};

export default ListView;
