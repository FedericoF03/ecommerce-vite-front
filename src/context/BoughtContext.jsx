import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthenticationContext";

import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";

export const BoughtContext = createContext();
const url = "http://localhost:3005/user/bought";

export const BoughtProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const { data, setData } = useFetch({
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

  const boughtPost = async (product, options) => {
    try {
      if (auth.data.status === "authorized") {
        const dataUser = {
          street: auth.data.result.address.address
            ? auth.data.result.address.address
            : null,
          country: auth.data.result.address.state
            ? auth.data.result.address.state
            : null,
          state: auth.data.result.address.state
            ? auth.data.result.address.state
            : null,
        };

        const config = {
          ...requests.postAppJson,
          body: JSON.stringify({
            price: product.price,
            item_id: product.id,
            quantity: product.quantity,
            description: product.title,
            image: product.pictures[0].secure_url,
            ...options,
            ...dataUser,
          }),
        };

        const req = await fetch(url, config);
        await req.json().then((el) => {
          setData((c) => ({ ...c, result: el.BoughtDATAUpdate }));
          cart.setData((c) => ({
            ...c,
            result: {
              items: c.result.items.filter(
                (item) => item.item_id !== product.id
              ),
            },
          }));
        });
      }
    } catch (error) {
      return error;
    }
  };

  const boughtPostAll = async (options) => {
    try {
      if (auth.data.status === "authorized") {
        const config = {
          ...requests.postAppJson,
          body: JSON.stringify(options),
        };
        const req = await fetch(url, config);
        await req.json().then((el) => {
          setData((c) => ({ ...c, result: el.BoughtDATAUpdate }));
          cart.setData((c) => ({ ...c, result: { items: [] } }));
        });
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <BoughtContext.Provider value={{ data, boughtPost, boughtPostAll }}>
      {children}
    </BoughtContext.Provider>
  );
};

BoughtProvider.propTypes = {
  children: PropTypes.element,
};
