import uuid from "react-uuid";
import { useParams } from "react-router-dom";

import requestOptions from "../consts/requestOptions";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";
import useFilters from "../hooks/useFilters";

import ProductCard from "../components/ProductCard/ProductCard";
import HeaderAndFooter from "../components/HeaderAndFooter/HeaderAndFooter";

import Path from "../pages/ListProducts/Path/Path";
import Pagination from "../pages/ListProducts/Pagination/Pagination";
import Filter from "../pages/ListProducts/Filter/Filter";
import URLS from "../consts/URLS";

const Products = () => {
  const categoryValueParam = useParams()["*"];

  const rangeLimits = [5, 10, 20, 50];
  const { pagination, queryPagination, handlerPaginationOffset } =
    usePagination(rangeLimits);

  const notFindThisFilters = ["category"];
  const { filtersStringFormat, handlerInsertSearchParams, deleteSearchParams } =
    useFilters(notFindThisFilters);

  const items = useFetch({
    url:
      URLS.itemsCategories +
      `?category=${categoryValueParam}&${queryPagination}&${filtersStringFormat}`,
    options: requestOptions.getBodyEncoded,
  });

  return (
    <main className="background-color--w min-vh--100">
      <HeaderAndFooter>
        <Path />
        {!items.isLoading && checkInstanceIrequest(items.data) && (
          <>
            {items.data.response.results.length > 0 ? (
              <>
                <Filter
                  key={uuid()}
                  deleteSearchParams={deleteSearchParams}
                  handlerInsertSearchParams={handlerInsertSearchParams}
                  filters={items.data.response.filters.filter(
                    (filter) => filter.id !== "category"
                  )}
                  avaibleFilters={items.data.response.available_filters}
                />
                <div className="list">
                  {items.data.response.results.map((product) => (
                    <ProductCard data={product} key={uuid()} />
                  ))}
                </div>
                <Pagination
                  pagination={pagination}
                  total={items.data.response.paging.primary_results}
                  handlerPaginationOffset={handlerPaginationOffset}
                />
              </>
            ) : (
              <p className="list" style={{ color: "black" }}>
                No hubo resultados
              </p>
            )}
          </>
        )}
      </HeaderAndFooter>
    </main>
  );
};

export default Products;
