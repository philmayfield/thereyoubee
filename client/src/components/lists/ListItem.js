import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";

const ListItem = props => {
  const { list, setList, editList, deleteList, isCurrent, allList } = props;
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
        {!allList ? (
          <Button
            icon="edit"
            classes={["btn-floating", "blue"]}
            clickOrTo={editList}
          />
        ) : null}
        {!allList ? (
          <Button
            icon="delete_forever"
            classes={["btn-floating", "red"]}
            clickOrTo={deleteList}
          />
        ) : null}
      </Button>
    </li>
  );
};

ListItem.propTypes = {
  allList: PropTypes.bool,
  isCurrent: PropTypes.bool.isRequired,
  editList: PropTypes.func,
  deleteList: PropTypes.func,
  setList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired
};

export default ListItem;
