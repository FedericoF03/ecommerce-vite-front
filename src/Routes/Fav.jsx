import { useContext } from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";

import { FavContext } from "../context/FavContext";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import URLS from "../consts/URLS";
import requestOptions from "../consts/requestOptions";

// import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";

import Cards from "../components/Cards/Cards";

const Fav = () => {
  const { userFavorites } = useContext(FavContext);
  // const { pagination } = usePagination([3]);

  const products = useFetch({
    url:
      checkInstanceIrequest(userFavorites.data) &&
      userFavorites.data.response.length > 1
        ? URLS.items +
          `?ids=${userFavorites.data.response
            .map((item) => item.item_id)
            .join(",")}`
        : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <>
      {checkInstanceIrequest(products.data) && (
        <>
          {products.data.response.length < 1 && (
            <p style={{ color: "white" }} className="button-cart-buy-all">
              No hay producto favorito
            </p>
          )}
          {products.data.response.length > 0 &&
            products.data.response.map((product) => (
              <Cards key={uuid()} product={product.body} />
            ))}
        </>
      )}
    </>
  );
};
Fav.propTypes = {
  typeCard: PropTypes.string,
};

export default Fav;
