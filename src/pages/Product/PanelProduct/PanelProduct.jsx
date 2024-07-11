import { useContext, useEffect, useState } from "react";
import "./PanelProduct.css";

import PropTypes from "prop-types";
import { CartContext } from "../../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

import checkInstanceIrequest from "../../../utils/checkInstanceIrequest";

const PanelProduct = ({ product }) => {
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();
  const [number, setNumber] = useState(product.quantity || 0);

  useEffect(() => {
    product.quantity && setNumber(product.quantity);
  }, [product.quantity]);

  const handlerNumber = (action) => {
    if (action === "rest")
      setNumber((numberState) => (numberState > 0 ? numberState - 1 : 0));
    else if (action === "sum")
      setNumber((numberState) =>
        (product.available_quantity &&
          product.available_quantity > numberState) ||
        (product.initial_quantity && product.initial_quantity > numberState)
          ? numberState + 1
          : product.available_quantity || 1
      );
    else
      setNumber(() =>
        (product.available_quantity && product.available_quantity > action) ||
        (product.initial_quantity && product.initial_quantity > action)
          ? parseInt(action)
          : product.available_quantity || product.initial_quantity || 1
      );
  };

  return (
    <section className="panel-product">
      {checkInstanceIrequest(cart.data) && (
        <>
          <div className="panel-product__quantity-controllers-conteiner">
            {product.available_quantity !== 1 &&
              !product.available_quantity && (
                <button onClick={() => handlerNumber("rest")}>{"<"}</button>
              )}
            <input
              type="text"
              name=""
              id=""
              style={{
                width: `${number.length}ch`,
              }}
              value={number}
              onChange={(e) => handlerNumber(e.target.value)}
            />
            {product.available_quantity !== 1 && (
              <button onClick={() => handlerNumber("sum")}>{">"}</button>
            )}
          </div>
          <div className="panel-product__controllers">
            <div className="panel-product__control-buttons">
              <Link
                to={`/buy?type=product&productID=${product.id}&quantity=${number}`}
              >
                Buy
              </Link>
            </div>
            <button
              onClick={() =>
                cart.updateCart({ product_id: product.id, quantity: number })
              }
              className="panel-product__control-buttons panel-product__control-buttons--grey"
            >
              CART
            </button>
          </div>
        </>
      )}
    </section>
  );
};

PanelProduct.propTypes = {
  product: PropTypes.object,
  updateCart: PropTypes.func,
};
export default PanelProduct;
