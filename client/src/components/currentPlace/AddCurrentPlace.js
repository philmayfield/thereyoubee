import React, { Component } from "react";
import { connect } from "react-redux";
import CurrentPlace from "./CurrentPlace";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { notEmpty } from "../../common/empty";
import { savePlace, resetCurrentPlace } from "../../actions/placeActions";

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

    this.props.savePlace(newPlace);
    this.handleClose();
  }

  handleClose() {
    this.setState({ show: false });
    this.props.resetCurrentPlace();
  }

  componentWillUnmount() {
    this.props.resetCurrentPlace();
  }

  render() {
    const { show } = this.state;

    return (
      <CSSTransition in={show} timeout={0} classNames="growFade" unmountOnExit>
        {show ? (
          <CurrentPlace
            {...this.props}
            handleAddPlace={this.handleAddPlace}
            handleClose={this.handleClose}
          />
        ) : (
          <div />
        )}
      </CSSTransition>
    );
  }
}

AddCurrentPlace.propTypes = {
  savePlace: PropTypes.func.isRequired,
  resetCurrentPlace: PropTypes.func.isRequired,
  currentPlace: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { savePlace, resetCurrentPlace }
)(AddCurrentPlace);
