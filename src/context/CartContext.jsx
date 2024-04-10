import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "./AuthenticationContext";

import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";

export const CartContext = createContext();
const url = "http://localhost:3005/user/cart";

export const CartProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const { data, setData, initStateFetch } = useFetch({
    url,
    config: requests.getURLencoded,
    status: "depend waiting",
  });

  useEffect(() => {
    if (auth.data.status === "failed")
      setData((c) => ({ ...c, status: "failed" }));
    else if (auth.data.status === "authorized")
      setData((c) => ({ ...c, status: auth.initStateFetch.status }));
  }, [setData, auth.data.status, auth.initStateFetch.status]);

  const updateCart = async (obj, router) => {
    try {
      const updateCartRequest = {
        ...requests.postAppJson,
        body: JSON.stringify(obj),
      };

      if (auth.data.status === "authorized") {
        const req = await fetch(url, updateCartRequest);
        req.json().then((item) => {
          if (item.status === "added") {
            const existItem = data.result.items.some(
              (old) => item.item_id === old.item_id
            );
            if (existItem) {
              setData((cartData) => {
                return {
                  ...cartData,
                  result: {
                    items: cartData.result.items.map((old) =>
                      old.item_id === item.item_id
                        ? {
                            item_id: item.item_id,
                            quantity: item.quantity,
                            bookmarked_date: Date(Date.now()),
                          }
                        : old
                    ),
                  },
                };
              });
            } else
              setData((cartData) => ({
                ...cartData,
                result: {
                  items: [
                    ...cartData.result.items,
                    {
                      item_id: item.item_id,
                      quantity: item.quantity,
                      bookmarked_date: Date(Date.now()),
                    },
                  ],
                },
              }));
          } else
            setData((cartData) => {
              const items = cartData.result.items.filter(
                (oldState) => oldState.item_id !== item.item_id
              );
              return {
                ...cartData,
                result: {
                  items,
                },
              };
            });
        });
      } else router("/register");
    } catch (error) {
      setData((c) => ({ ...c, error }));
    }
  };

  return (
    <CartContext.Provider value={{ data, updateCart, setData, initStateFetch }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.element,
};
