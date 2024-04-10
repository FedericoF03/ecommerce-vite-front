import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Cards from "../components/Cards/Cards";

import { CartContext } from "../context/CartContext";

import usePagination from "../hooks/usePagination";
import { useFetch } from "../hooks/useFetch";


import requests from "../assets/consts/request";

const Cart = () => {
  const cart = useContext(CartContext);

  const { pagination } = usePagination({ limitSet: 3 });
  const [totals, setTotals] = useState([]);
  const [ids, setIds] = useState();

  useEffect(() => {
    setIds(
      cart.data.result?.items.length > 0 && cart.data.result.items.reduce((acc, cur, i) =>
        pagination.offset <= i && i < 20 + pagination.offset
          ? `${acc.item_id || acc},${cur.item_id}`
          : acc
      )
    );
  }, [cart.data.result, pagination.offset]);

  const { data, setData } = useFetch({
    url: `http://localhost:3005/products/item?ids=${ids}`,
    config: requests.getURLencoded,
    status: "depending wait",
  });

  const cartSetter = setData;

  useEffect(() => {
    ids && cartSetter((cartState) => ({ ...cartState, status: "wait" }));
  }, [ids, cartSetter]);

  const newData =
    data.result &&
    data.result.length > 0 &&
    data.result.map((el) => ({
      ...el.body,
      ...cart.data.result?.items.find((elsec) => elsec.item_id === el.body.id),
    }));

  const dynamicPanel =
    totals.length > 0 &&
    totals.reduce(
      (acc, current) => {
        return {
          priceTotal: acc.priceTotal + current.price,
          quantityTotal: acc.quantityTotal + current.quantity,
          sent_price_total: acc.sent_price_total + current.sent_price,
        };
      },
      {
        priceTotal: 0,
        quantityTotal: 0,
        sent_price_total: 0,
      }
    );

  return (
    <>
      <div className="conteiner-data-carts">
        {data.result && (
          <>
            {data.result.length < 1 && (
              <p style={{ color: "white" }} className="button-cart-buy-all">
                Carrito vacio
              </p>
            )}
            {data.result.length > 0 && (
              <>
                {newData &&
                  newData.map((el, i) => (
                    <Cards
                      index={i}
                      key={el.id}
                      setTotals={setTotals}
                      item={el}
                    />
                  ))}
                {dynamicPanel && (
                  <>
                    <p>Price total: {dynamicPanel.priceTotal.toFixed(2)}</p>
                    <p>quantity Total: {dynamicPanel.quantityTotal}</p>
                    <p>
                      sent price Total:
                      {dynamicPanel.sent_price_total.toFixed(2)}
                    </p>
                    <p>
                      sent and price total:
                      {(
                        parseInt(dynamicPanel.priceTotal) +
                        parseInt(dynamicPanel.sent_price_total)
                      ).toFixed(2)}
                    </p>
                  </>
                )}
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
