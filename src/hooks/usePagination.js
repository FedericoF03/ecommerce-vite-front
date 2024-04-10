import { useState } from "react";
import { useLocation } from "react-router-dom";

const usePagination = ({ params, setLimit, setOffset }) => {
  const queries = new URLSearchParams(useLocation().search);
  let limit = queries.get("limit") || setLimit || 50;
  const offset = queries.get("offset") || setOffset || 0;
  queries.delete("limit");
  queries.delete("offset");
  queries.delete("category");
  params && params.forEach((param) => queries.set(param.key, param.value));

  // history.pushState(
  //   null,
  //   "",
  //   window.location.origin + window.location.pathname
  // );

  const [pagination, setPagination] = useState({
    limit,
    offset,
    filters: queries.toString(),
  });
  const query = `?limit=${pagination.limit}&offset=${pagination.offset}&${pagination.filters}`;

  const handlerPaginationOffset = (action, total) => {
    if (action === "sum")
      setPagination((pag) => {
        const offset =
          pag.offset + pag.limit < total
            ? pag.offset + pag.limit
            : total - pag.offset;
        return { ...pag, offset };
      });
    else if (action === "rest")
      setPagination((pag) => {
        const offset = pag.offset - pag.limit > 0 ? pag.offset - pag.limit : 0;
        return { ...pag, offset };
      });
  };

  const handlerPaginationLimit = (action) => {
    if (action === "sum") setPagination((c) => ({ ...c }));
    else if (action === "rest") setPagination((c) => ({ ...c }));
  };

  const handlerSearchParams = (e) => {
    setPagination((c) => {
      const queries = new URLSearchParams(c.filters);
      queries.set(
        e.target.attributes["data-filter"].value,
        e.target.attributes["data-id"].value
      );
      return { ...c, filters: queries.toString() };
    });
  };

  const deleteSearchParams = (e) => {
    setPagination((c) => {
      const queries = new URLSearchParams(c.filters);
      queries.delete(e.target.attributes["data-filter"].value);
      return { ...c, filters: queries.toString() };
    });
  };

  return {
    pagination,
    handlerPaginationOffset,
    handlerPaginationLimit,
    handlerSearchParams,
    deleteSearchParams,
    query,
  };
};

export default usePagination;
