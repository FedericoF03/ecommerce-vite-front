import "./ModalCart.css";

import { useContext } from "react";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

import EmptyCart from "../EmptyCart";
import URLS from "../../consts/URLS";
import requestOptions from "../../consts/requestOptions";

import checkInstanceIrequest from "../../utils/checkInstanceIrequest";

import useFetch from "../../hooks/useFetch";

import CardCartModal from "../CardCartModal/CardCartModal";

const ModalCart = (props) => {
  const { cart } = useContext(CartContext);

  const products = useFetch({
    url:
      checkInstanceIrequest(cart.data) && cart.data.response.items.length > 0
        ? URLS.items +
          `?ids=${cart.data.response.items
            .map((item) => item.item_id)
            .join(`, `)}`
        : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <div {...props} className="conteiner-cart-modal">
      <div className="conteiner-data-carts">
        {checkInstanceIrequest(products.data) && (
          <>
            {products.data.response.length < 0 ? (
              <>
                {products.data.response.map((product, i) => (
                  <CardCartModal key={uuid()} item={product} index={i} />
                ))}
                <Link className="button-cart-buy-all" to={"/buy?type=all"}>
                  Buy all
                </Link>
              </>
            ) : (
              <EmptyCart />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCart;
