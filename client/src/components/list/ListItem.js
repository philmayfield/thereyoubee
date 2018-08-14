import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../common/Button";
import { flagPlace } from "../../actions/placeActions";
import { CSSTransition } from "react-transition-group";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.animationTime = 250;
    this.state = {
      show: true
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    this.setState({ show: false });
    const { item, flagPlace } = this.props;

    // give the animation time to finish
    setTimeout(() => {
      flagPlace(item);
    }, this.animationTime);
  }

  render() {
    const {
      // place_id,
      // author,
      address,
      // date,
      suggestion
      // latLng = {}
    } = this.props.item;
    // const { lat, lng } = latLng;

    return (
      <CSSTransition
        in={this.state.show}
        appear={true}
        timeout={0}
        classNames="place-card"
      >
        <div className="card place-card">
          <div className="card-title-area with-fab teal">
            <i className="material-icons mr-2 place-icon white-text">place</i>
            <span className="card-title white-text">{suggestion}</span>
            <Button
              icon="menu"
              fab={true}
              classes={[
                "btn-floating",
                // "btn-large",
                "halfway-fab",
                "teal",
                "lighten-2"
              ]}
            >
              <Button
                icon="delete_forever"
                classes={["btn-floating", "red"]}
                clickOrTo={this.handleDelete}
              />
            </Button>
          </div>
          <div className="card-content">
            <p>{address}</p>
          </div>
        </div>
      </CSSTransition>
    );
  }
}

ListItem.propTypes = {
  index: PropTypes.number,
  flagPlace: PropTypes.func.isRequired,
  item: PropTypes.object
};

export default connect(
  null,
  { flagPlace }
)(ListItem);
