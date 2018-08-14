import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../common/Button";
import { flagPlace } from "../../actions/placeActions";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { item, flagPlace } = this.props;
    flagPlace(item);
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
      <div className="card">
        <div className="card-title-area with-fab teal">
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
    );
  }
}

ListItem.propTypes = {
  flagPlace: PropTypes.func.isRequired,
  item: PropTypes.object
};

export default connect(
  null,
  { flagPlace }
)(ListItem);
