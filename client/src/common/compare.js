const compare = key => {
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const compA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const compB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    return compA > compB ? 1 : compA < compB ? -1 : 0;
  };
};

export default compare;
