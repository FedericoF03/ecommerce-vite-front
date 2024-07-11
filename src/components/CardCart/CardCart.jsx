import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CardCart.css";
import PropTypes from "prop-types";

import { CartContext } from "../../context/CartContext";
import Gear from "../Gear/Gear";

const CardCart = ({ product, index }) => {
  const { updateCart } = useContext(CartContext);
  const [number, setNumber] = useState(product.quantity);

  useEffect(() => {
    product.quantity && setNumber(product.quantity);
  }, [product.quantity]);

  // const handlerNumber = (action, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (action === "rest")
  //     setNumber((numberState) => (numberState > 1 ? numberState - 1 : 1));
  //   else if (action === "sum")
  //     setNumber((numberState) =>
  //       (item.available_quantity && item.available_quantity > numberState) ||
  //       (item.initial_quantity && item.initial_quantity > numberState)
  //         ? numberState + 1
  //         : item.available_quantity || item.initial_quantity
  //     );
  //   else
  //     setNumber(() =>
  //       (item.available_quantity && item.available_quantity > action) ||
  //       (item.initial_quantity && item.initial_quantity > action)
  //         ? parseInt(action)
  //         : item.available_quantity || item.initial_quantity || 1
  //     );
  // };

  // useEffect(() => {
  //   if (number > 0)
  //     setTotals((totals) => {
  //       totals[index] = {
  //         id: item.id,
  //         quantity: number,
  //         price: item.price * number,
  //         sent_price: (item.price * number) / 10,
  //       };
  //       return [...totals];
  //     });
  //   return () =>
  //     setTotals((totals) => [...totals.filter((el) => item.id !== el.id)]);
  // }, [index, number, setTotals, item.price, item.id]);

  return (
    <div className="card-cart display--flex justify-content--s-a align-items--center">
      <div className="card-cart__img-product">
        <img src={product.pictures[0].url} alt="product image" />
      </div>
      <div className="card-cart__conteiner-info-cart">
        <p className="card-cart__product-name">{product.title}</p>
        <div className="card-cart__conteiner-input">
          <button onClick={(e) => {}} className="card-cart__buttons">
            {"<"}
          </button>
          <p className="card-cart__quantity-input" name="" id="">
            {number}
          </p>
          <button onClick={(e) => {}} className="card-cart__button--right">
            {">"}
          </button>
          <p>${(product.price * number).toFixed(2)}</p>
        </div>
      </div>
      <div className="card-cart__conteiner-button-process">
        <Gear />
        <Link
          className="button-cart-buy-all"
          to={`/buy?type=item&itemID=${product.id}`}
        >
          Buy
        </Link>
        {number === product.quantity ? (
          <button className="card-cart__conteiner-buttons" onClick={() => {}}>
            remove
          </button>
        ) : (
          <button className="card-cart__conteiner-buttons" onClick={() => {}}>
            update
          </button>
        )}
      </div>
    </div>
  );
};

CardCart.propTypes = {
  product: PropTypes.object,
  index: PropTypes.number,
};

export default CardCart;
