import React from "react";
import ListColor from "./ListColor";

const ListColorPicker = props => {
  const listOfColors = colors.map(color => (
    <ListColor key={color} color={color} {...props} />
  ));

  return (
    <fieldset className="color-picker">
      <legend>Choose a color for your list</legend>
      <div className="color-picker__colors">{listOfColors}</div>
    </fieldset>
  );
};

export default ListColorPicker;

export const colors = [
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "grey",
  "blue-grey",
  "black"
];
