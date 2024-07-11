import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";

import useFetch from "../hooks/useFetch";
import Cards from "../components/Cards/Cards";
import checkInstanceIrequest from "../utils/checkInstanceIrequest";
import URLS from "../consts/URLS";
import requestOptions from "../consts/requestOptions";
import uuid from "react-uuid";

const Cart = () => {
  const { cart } = useContext(CartContext);

  const cartProducts = useFetch({
    url:
      checkInstanceIrequest(cart.data) && cart.data.response.items.length > 1
        ? URLS.items +
          `?ids=${cart.data.response.items
            .map((item) => item.item_id)
            .join(",")}`
        : "",
    options: requestOptions.getBodyEncoded,
  });
  console.log(cartProducts, cart);
  return (
    <>
      <div className="conteiner-data-carts">
        {checkInstanceIrequest(cartProducts.data) && (
          <>
            {cartProducts.data.response.length < 1 && (
              <p style={{ color: "white" }} className="button-cart-buy-all">
                Carrito vacio
              </p>
            )}
            {cartProducts.data.response.length > 0 && (
              <>
                {cartProducts.data.response.map((product, i) => (
                  <Cards index={i} key={uuid()} product={product.body} />
                ))}
              </>
            )}
          </>
        )}
      </div>
      <Link className="button-cart-buy-all" to={"/buy?type=all"}>
        Buy all
      </Link>
    </>
  );
};

export default Cart;
