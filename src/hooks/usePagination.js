import { useState } from "react";
import { useLocation } from "react-router-dom";

const limitDefault = 50;
const offSetDefault = 0;

const usePagination = (whiteListLimit = false) => {
  const queries = new URLSearchParams(useLocation().search);

  const [pagination, setPagination] = useState({
    limit:
      whiteListLimit && whiteListLimit.find(() => queries.get("limit"))
        ? queries.get("limit")
        : limitDefault,
    offset: offSetDefault,
  });

  const queryPagination = `limit=${pagination.limit}&offset=${pagination.offset}`;

  const handlerPaginationOffset = (action, total) => {
    if (action === "sum")
      setPagination((paginationState) => {
        const offset =
          paginationState.offset + paginationState.limit < total
            ? paginationState.offset + paginationState.limit
            : total - paginationState.offset;
        return { ...paginationState, offset };
      });
    else if (action === "rest")
      setPagination((paginationState) => {
        const offset =
          paginationState.offset - paginationState.limit > 0
            ? paginationState.offset - paginationState.limit
            : 0;
        return { ...paginationState, offset };
      });
  };

  return {
    pagination,
    queryPagination,
    handlerPaginationOffset,
  };
};

export default usePagination;
