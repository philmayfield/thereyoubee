const totalPlaces = (number = 0, loading = false, listName = "all lists") => {
  return loading
    ? "Fetching places list…"
    : `${number === 0 ? "No" : number} place${
        number === 1 ? "" : "s"
      } in ${listName}`;
};

export default totalPlaces;
