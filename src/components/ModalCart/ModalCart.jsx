import "./ModalCart.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import CardCartModal from "../CardCartModal/CardCartModal";

import { useFetch } from "../../hooks/useFetch";
import useDependency from "../../hooks/useDependency";

import { CartContext } from "../../context/CartContext";

import requests from "../../assets/consts/request";

const ModalCart = (props) => {
  const cart = useContext(CartContext);
  const ids =
    cart.data.result &&
    cart.data.result.items.reduce(
      (acc, next) => `${acc + (acc ? "," : "") + next.item_id}`,
      ""
    );

  const { data, setData } = useFetch({
    url: `http://localhost:3005/products/item?ids=${ids}`,
    config: requests.getURLencoded,
    status: "depend waiting",
  });

  useEffect(() => {
    if (ids) setData((c) => ({ ...c, status: "wait" }));
    else
      setData((c) => ({
        ...c,
        result: null,
      }));
  }, [ids, setData]);

  useDependency(cart, setData);

  let cartProducts =
    data.result &&
    data.result.map((item) => ({
      ...item.body,
      ...cart.data.result.items.find(
        (itemCart) => itemCart.item_id === item.body.id
      ),
    }));

  return (
    <div {...props} className="conteiner-cart-modal">
      <div className="conteiner-data-carts">
        {cartProducts && (
          <>
            {cartProducts.map((el, i) => (
              <CardCartModal key={el.id} item={el} index={i} />
            ))}
            <Link className="button-cart-buy-all" to={"/buy?type=all"}>
              Buy all
            </Link>
          </>
        )}
        {cart.data.status === "authorized" && cart.data.result.length > 0 && (
          <p
            {...props}
            style={{ color: "white" }}
            className="button-cart-buy-all conteiner-cart-modal--empty"
          >
            Carrito vacio
          </p>
        )}
      </div>
    </div>
  );
};

export default ModalCart;
