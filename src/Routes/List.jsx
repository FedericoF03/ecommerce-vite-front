import { useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import { useParams } from "react-router-dom";

import { SiteContext } from "../context/SiteContext";

import Filter from "../components/Filter/Filter";
import Path from "../components/Path/Path";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";

import usePagination from "../hooks/usePagination";
import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";
import emptyOrFull from "../utils/emptyOrFull";

const List = () => {
  const site = useContext(SiteContext);
  const params = useParams();
  const categoryValue = params["*"];
  const [listCache, setListCache] = useState();
  const {
    pagination,
    handlerPaginationOffset,
    handlerSearchParams,
    deleteSearchParams,
    query,
  } = usePagination({
    params: [],
  });

  const listItems = useFetch({
    url: `http://localhost:3005/products/items${query}&category=${categoryValue}&site=${categoryValue.replace(
      /\d+/g,
      ""
    )}`,
    config: requests.getURLencoded,
  });
  const listItemsSetter = listItems.setData;

  useEffect(
    () => listItemsSetter((c) => ({ ...c, status: "wait" })),
    [query, listItemsSetter]
  );

  useEffect(() => {
    site.handlerCountry(categoryValue.replace(/\d+/g, ""));
  }, [site, categoryValue]);

  useEffect(
    () => listItemsSetter((c) => ({ ...c, status: "wait" })),
    [categoryValue, listItemsSetter]
  );

  const itemListState = emptyOrFull(listItems, ["results"]);

  useEffect(() => {
    listItems.data.status !== "failed" &&
      listItems.data.result &&
      itemListState.full &&
      setListCache(listItems.data.result.results);
  }, [listItems.data.result, listItems.data.status, itemListState.full]);

  return (
    <main className="background-color--w min-vh--100">
      <Path />
      {listCache && (
        <>
          <Filter
            key={uuid()}
            handlerSearchParams={handlerSearchParams}
            deleteSearchParams={deleteSearchParams}
            filtersData={listItems}
            loading={listItems.data.status === "wait"}
          />
          <div className="list">
            {listCache.map((el) => (
              <ProductCard data={el} currency={site.currency} key={el.id} />
            ))}
          </div>
          <Pagination
            pagination={pagination}
            total={listItems.data.result.paging.primary_results}
            handlerPaginationOffset={handlerPaginationOffset}
          />
        </>
      )}
      {itemListState.empty && (
        <p className="list" style={{ color: "black" }}>
          No hubo resultados
        </p>
      )}
    </main>
  );
};

export default List;
