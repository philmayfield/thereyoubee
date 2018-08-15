const totalPlaces = (number = 0, loading = false) => {
  return loading
    ? "Fetching places list…"
    : `${number === 0 ? "No" : number} place${
        number > 1 || number === 0 ? "s" : ""
      } on the list`;
};

export default totalPlaces;
