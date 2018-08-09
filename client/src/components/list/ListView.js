import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllPlaces } from "../../actions/placeActions";
import Alert from "../common/Alert";
import { notEmpty } from "../../common/empty";
import List from "./List";

class ListView extends Component {
  componentDidMount() {
    this.props.getAllPlaces();
  }

  render() {
    const {
      app,
      // auth,
      places
    } = this.props;
    // const { isAuth } = auth;
    const { loadingArr } = app;
    const isLoading = notEmpty(loadingArr);
    const hasPlaces = notEmpty(places);
    let content;

    if (hasPlaces && !isLoading) {
      content = <List places={places} />;
    } else if (!isLoading)
      content = (
        <Alert heading="There aren&rsquo;t any places here yet!">
          <p>
            Looks like you havent added any places here yet, why don&rsquo;t you
            flip over to the map view and start adding some!
          </p>
        </Alert>
      );

    return (
      <div className="list-view">
        <div className="sr-only">
          <h2>List View</h2>
        </div>
        {!!hasPlaces && (
          <div className="right-align">
            <p className="flow-text">
              {places.length} Place
              {places.length > 1 ? "s" : ""}
            </p>
          </div>
        )}
        {content}
      </div>
    );
  }
}

ListView.propTypes = {
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired,
  getAllPlaces: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  places: state.places
});

export default connect(
  mapStateToProps,
  { getAllPlaces }
)(ListView);
