const totalPlaces = (number = 0, loading = false, listName = "on the list") => {
  return loading
    ? "Fetching places list…"
    : `${number === 0 ? "No" : number} place${
        number > 1 || number === 0 ? "s" : ""
      } ${listName}`;
};

export default totalPlaces;
