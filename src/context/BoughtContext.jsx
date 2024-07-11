import { createContext, useContext } from "react";
import PropTypes from "prop-types";

import URLS from "../consts/URLS";
import requestOptions from "../consts/requestOptions";

import useFetch from "../hooks/useFetch";

import { AuthContext } from "./AuthenticationContext";
import { CartContext } from "./CartContext";

export const BoughtContext = createContext();

export const BoughtProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const cart = useContext(CartContext);

  const boughts = useFetch({
    url: user.isAuth ? URLS.userBought : "",
    options: requestOptions.getBodyEncoded,
  });

  // const boughtPost = async (product, options) => {
  //   try {
  //     if (authentication.data.status === "authorized") {
  //       const dataUser = {
  //         street: authentication.data.result.address.address
  //           ? authentication.data.result.address.address
  //           : null,
  //         country: authentication.data.result.address.state
  //           ? authentication.data.result.address.state
  //           : null,
  //         state: authentication.data.result.address.state
  //           ? authentication.data.result.address.state
  //           : null,
  //       };

  //       const config = {
  //         ...requests.postAppJson,
  //         body: JSON.stringify({
  //           price: product.price,
  //           item_id: product.id,
  //           quantity: product.quantity,
  //           description: product.title,
  //           image: product.pictures[0].secure_url,
  //           ...options,
  //           ...dataUser,
  //         }),
  //       };

  //       const req = await fetch(url, config);
  //       await req.json().then((el) => {
  //         userBoughts.setData((c) => ({ ...c, result: el.BoughtDATAUpdate }));
  //         cart.setData((c) => ({
  //           ...c,
  //           result: {
  //             items: c.result.items.filter(
  //               (item) => item.item_id !== product.id
  //             ),
  //           },
  //         }));
  //       });
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // const boughtPostAll = async (options) => {
  //   try {
  //     if (authentication.data.status === "authorized") {
  //       const config = {
  //         ...requests.postAppJson,
  //         body: JSON.stringify(options),
  //       };
  //       const req = await fetch(url, config);
  //       await req.json().then((el) => {
  //         userBoughts.setData((c) => ({ ...c, result: el.BoughtDATAUpdate }));
  //         cart.setData((c) => ({ ...c, result: { items: [] } }));
  //       });
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // };

  return (
    <BoughtContext.Provider value={{ boughts }}>
      {children}
    </BoughtContext.Provider>
  );
};

BoughtProvider.propTypes = {
  children: PropTypes.element,
};
