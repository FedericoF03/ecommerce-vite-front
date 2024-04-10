import "./PanelProduct.css";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";

const PanelProduct = ({ item }) => {
  const { data, updateCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [number, setNumber] = useState(item.quantity);

  useEffect(() => {
    item.quantity && setNumber(item.quantity);
  }, [item.quantity]);

  const handlerNumber = (action) => {
    if (action === "rest")
      setNumber((numberState) => (numberState > 0 ? numberState - 1 : 0));
    else if (action === "sum")
      setNumber((numberState) =>
        (item.available_quantity && item.available_quantity > numberState) ||
        (item.initial_quantity && item.initial_quantity > numberState)
          ? numberState + 1
          : item.available_quantity || 1
      );
    else
      setNumber(() =>
        (item.available_quantity && item.available_quantity > action) ||
        (item.initial_quantity && item.initial_quantity > action)
          ? parseInt(action)
          : item.available_quantity || item.initial_quantity || 1
      );
  };

  return (
    <section className="panel-product">
      {(data.status === "authorized" || data.status === "failed") && (
        <>
          <div className="panel-product__quantity-controllers-conteiner">
            {item.available_quantity !== 1 && !item.available_quantity && (
              <button onClick={() => handlerNumber("rest")}>{"<"}</button>
            )}
            <input
              type="text"
              name=""
              id=""
              style={{
                width: `${number.toString().length}ch`,
              }}
              value={number}
              onChange={(e) => handlerNumber(e.target.value)}
            />
            {item.available_quantity !== 1 && (
              <button onClick={() => handlerNumber("sum")}>{">"}</button>
            )}
          </div>
          <div className="panel-product__controllers">
            <div className="panel-product__control-buttons">
              <Link to={`/buy?type=item&itemID=${item.id}&quantity=${number}`}>Buy</Link>
            </div>
            <button
              onClick={() =>
                updateCart(
                  {
                    item_id: item.id,
                    quantity: number,
                  },
                  navigate
                )
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
  item: PropTypes.object,
  updateCart: PropTypes.func,
};
export default PanelProduct;
