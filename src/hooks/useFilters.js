import { useState } from "react";
import { useLocation } from "react-router-dom";

const useFilters = (whiteList) => {
  whiteList = [...whiteList, "offset", "limit"];
  const QueryStringURL = new URLSearchParams(useLocation().search);
  QueryStringURL.forEach((value, key) => {
    whiteList.find((keyWhiteList) => keyWhiteList === key)
      ? QueryStringURL.delete(key)
      : QueryStringURL.set(key, value);
  });
  const [filters, setFilters] = useState(QueryStringURL);

  const filtersStringFormat = filters.toString();

  const handlerInsertSearchParams = (e) =>
    setFilters((filterUrlSearchParams) => {
      const filter = filterUrlSearchParams;
      filter.set(
        e.target.attributes["data-filter"].value,
        e.target.attributes["data-filter-id"].value
      );
      return new URLSearchParams(filter);
    });

  const deleteSearchParams = (e) =>
    setFilters((filterUrlSearchParams) => {
      const filter = filterUrlSearchParams;
      filter.delete(e.target.attributes["data-filter"].value);
      return new URLSearchParams(filter);
    });

  return {
    filters,
    filtersStringFormat,
    handlerInsertSearchParams,
    deleteSearchParams,
  };
};

export default useFilters;
