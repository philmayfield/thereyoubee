import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";

const ListItem = props => {
  const { list, setList, editList, deleteList, isCurrent } = props;
  return (
    <li
      className={`collection-item d-flex justify-content-between align-items-center ${
        isCurrent ? "active" : ""
      }`}
      onClick={setList}
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
          clickOrTo={editList}
        />
        <Button
          icon="delete_forever"
          classes={["btn-floating", "red"]}
          clickOrTo={deleteList}
        />
      </Button>
    </li>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  editList: PropTypes.func,
  deleteList: PropTypes.func,
  setList: PropTypes.func.isRequired,
  isCurrent: PropTypes.bool.isRequired
};

export default ListItem;
