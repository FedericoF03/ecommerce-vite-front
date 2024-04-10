import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

import Cards from "../components/Cards/Cards";

import { FavContext } from "../context/FavContext";

import usePagination from "../hooks/usePagination";
import { useFetch } from "../hooks/useFetch";
import requests from "../assets/consts/request";

const Fav = () => {
  const fav = useContext(FavContext);
  const { pagination } = usePagination({ limitSet: 3 });

  const arrayIDS =
    fav.data.result &&
    fav.data.result
      .map((el, i) =>
        pagination.offset <= i < 20 + pagination.offset ? el.item_id : ""
      )
      .join();

  const { data, setData } = useFetch({
    url: `http://localhost:3005/products/item?ids=${arrayIDS}`,
    config: requests.getURLencoded,
    status: "depending waiting",
  });

  const favSetter = setData;

  useEffect(() => {
    fav.data.result?.length < 1 &&
      favSetter((cartState) => ({ ...cartState, result: [] }));
  }, [fav.data.result?.length, favSetter]);

  useEffect(() => {
    favSetter((cartState) => ({ ...cartState, status: "wait" }));
  }, [arrayIDS, favSetter]);
  return (
    <>
      {data.result && (
        <>
          {data.result.length < 1 && data.status === "authorized" && (
            <p style={{ color: "white" }} className="button-cart-buy-all">
              No hay producto favorito
            </p>
          )}
          {data.result.length > 0 &&
            data.result.map((el) => <Cards key={el.body.id} item={el.body} />)}
        </>
      )}
    </>
  );
};
Fav.propTypes = {
  typeCard: PropTypes.string,
};

export default Fav;
