const emptyOrFull = (dep, routes) => {
  if (dep.data.status === "authorized") {
    let dependency = dep.data.result;
    for (let i = 0; i <= routes.length - 1; ++routes)
      dependency = dependency[routes[i]];
    return {
      full: dependency.length > 0,
      empty: dependency.length <= 0,
    };
  }
  return {
    full: false,
    empty: false,
  };
};

export default emptyOrFull;
