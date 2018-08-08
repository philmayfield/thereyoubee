import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();

    console.log("e", e);
    console.log(">>", this.props.item);
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
              "btn-large",
              "halfway-fab",
              "teal",
              "lighten-2"
            ]}
          >
            <Button icon="insert_chart" classes={["btn-floating", "blue"]} />
            <Button icon="publish" classes={["btn-floating", "yellow"]} />
            <Button icon="format_quote" classes={["btn-floating", "orange"]} />
          </Button>
        </div>
        <div className="card-content">
          <p>{address}</p>
        </div>
        {/* ({lat}, {lng}) */}
        {/* <Button clickOrTo={this.handleDelete}>Delete</Button> */}
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.object
};

export default ListItem;
