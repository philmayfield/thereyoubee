import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";

const ListItem = props => {
  const {
    list,
    setList,
    editList,
    deleteList,
    isCurrent,
    allList,
    showButtons = false
  } = props;
  return (
    <li
      className={`collection-item cursor-pointer d-flex justify-content-between align-items-center ${
        isCurrent ? "active" : ""
      }`}
      onClick={setList}
    >
      <div>{list.name}</div>
      {showButtons ? (
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
      ) : null}
    </li>
  );
};

ListItem.propTypes = {
  allList: PropTypes.bool,
  showButtons: PropTypes.bool,
  isCurrent: PropTypes.bool.isRequired,
  editList: PropTypes.func,
  deleteList: PropTypes.func,
  setList: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired
};

export default ListItem;
