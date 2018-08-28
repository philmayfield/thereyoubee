import React from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";
import getTextColor from "../../common/getTextColor";

const ListItem = props => {
  const {
    list,
    setList,
    editList,
    deleteList,
    isCurrent,
    allList = false,
    showButtons = false
  } = props;
  const listColor = list.color || "teal";
  const textColor = getTextColor(listColor);
  const colorClasses = `${listColor} ${textColor}-text`;

  return (
    <li
      className={`collection-item cursor-pointer d-flex justify-content-between align-items-center ${
        isCurrent ? colorClasses : ""
      }`}
      onClick={setList}
    >
      <div>{list.name}</div>
      {showButtons && (
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
          {!allList && (
            <Button
              icon="edit"
              classes={["btn-floating", "blue"]}
              clickOrTo={editList}
            />
          )}
          {!allList && (
            <Button
              icon="delete_forever"
              classes={["btn-floating", "red"]}
              clickOrTo={deleteList}
            />
          )}
        </Button>
      )}
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
