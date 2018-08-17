import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../common/Button";
import Icon from "../common/Icon";
import { flagPlace, setCurrentPlace } from "../../actions/placeActions";
import { CSSTransition } from "react-transition-group";
import { withRouter } from "react-router-dom";
import moment from "moment";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.animationTime = 250;
    this.state = {
      show: true
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleViewPlace = this.handleViewPlace.bind(this);
  }

  handleDelete() {
    // flag the place for deletion
    this.setState({ show: false });
    const { item, flagPlace } = this.props;

    // give the animation time to finish
    setTimeout(() => {
      flagPlace(item);
    }, this.animationTime);
  }

  handleViewPlace() {
    // view the place on the map
    const { setCurrentPlace, item, history } = this.props;
    setCurrentPlace(item);
    history.push("/map");
  }

  render() {
    const {
      // place_id,
      // author,
      address,
      date,
      suggestion,
      latLng = {}
    } = this.props.item;

    return (
      <CSSTransition
        in={this.state.show}
        appear={true}
        timeout={0}
        classNames="place-card"
      >
        <div className="card place-card">
          <div className="card-title-area with-fab teal">
            <Icon name="place" classes={["mr-2"]} color="white" />
            <span className="card-title white-text">{suggestion}</span>
            <Button
              icon="more_vert"
              fab={true}
              classes={["btn-floating", "halfway-fab", "teal", "lighten-2"]}
            >
              <Button
                icon="visibility"
                classes={["btn-floating", "blue"]}
                clickOrTo={this.handleViewPlace}
              />
              <Button
                icon="delete_forever"
                classes={["btn-floating", "red"]}
                clickOrTo={this.handleDelete}
              />
            </Button>
          </div>
          <div className="card-content">
            <p>{address}</p>
            <small className="grey-text d-flex justify-content-between mt-1">
              <span>Added on {moment(date).format("MMM D, YYYY")}</span>
              <span className="right-align">
                {latLng.lat}, {latLng.lng}
              </span>
            </small>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

ListItem.propTypes = {
  flagPlace: PropTypes.func.isRequired,
  setCurrentPlace: PropTypes.func.isRequired,
  item: PropTypes.object,
  history: PropTypes.object
};

export default connect(
  null,
  { flagPlace, setCurrentPlace }
)(withRouter(ListItem));
