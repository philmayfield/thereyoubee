import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";

const ListItem = props => {
  const { list, setList, isCurrent } = props;
  return (
    <li
      className={`collection-item d-flex justify-content-between align-items-center ${
        isCurrent ? "active" : ""
      }`}
    >
      <div>{list.name}</div>
      <Button
        icon="more_vert"
        fab={true}
        classes={["btn-floating", "halfway-fab", "teal", "lighten-2"]}
      >
        <Button
          icon="check"
          classes={["btn-floating", "green"]}
          clickOrTo={setList}
        />
        <Button
          icon="edit"
          classes={["btn-floating", "blue"]}
          // clickOrTo={this.handleViewPlace}
        />
        <Button
          icon="delete_forever"
          classes={["btn-floating", "red"]}
          // clickOrTo={this.handleDelete}
        />
      </Button>
    </li>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  setList: PropTypes.func.isRequired,
  isCurrent: PropTypes.bool.isRequired
};

export default ListItem;
