import { createContext, useContext } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "./AuthenticationContext";

import requests from "../consts/requestOptions";
import useFetch from "../hooks/useFetch";
import makeRequest from "../utils/makeRequest";
import { Fetcher } from "../test/components/models/Request/Fetcher";
import { HandlerErrorDefault } from "../test/components/models/HandlerError/HandlerErrorDefault";
import cartType from "../consts/cartType";
import requestOptions from "../consts/requestOptions";
import URLS from "../consts/URLS";

export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { authentication } = useContext(AuthContext);
//   const userCartURL = authentication.isAuth ? url : "empty";

//   const userDataCart = useFetch({
//     url: userCartURL,
//     options: requests.getURLencoded,
//   });

//   const updateCart = async (body) => {
//     let options = requests.postAppJson;
//     options.body = JSON.stringify(body);
//     await makeRequest(new Fetcher(url, options), new HandlerErrorDefault());

//     const exist = userDataCart.data.response.items.some(
//       (item) => item.item_id === body.item_id
//     );

//     if (body.quantity > 0) {
//       userDataCart.setData(
//         (userDataCartState) => {}
//         // userDataCartState.setResponse({
//         //   ...userDataCartState.response,
//         //   items: userDataCartState.response.items.map((item) =>
//         //     item.item_id === body.item_id
//         //       ? { ...item, quantity: body.quantity }
//         //       : item
//         //   ),
//         // })
//       );
//       // : userDataCart.setData((userDataCartState) => {
//       //     userDataCartState.setResponse({
//       //       ...userDataCartState.response,
//       //       items: [...userDataCartState.response.items, body],
//       //     });
//       //     return userDataCartState;
//       //   });
//     } else if (body.quantity === 0) {
//       exist &&
//         userDataCart.setData((userDataCartState) => {
//           userDataCartState.response = {
//             ...userDataCartState.response,
//             items: [...userDataCartState.response.items].filter(
//               (item) => item.item_id !== body.item_id
//             ),
//           };

//           return userDataCartState;
//         });
//     }
//   };

//   return (
//     <CartContext.Provider value={{ updateCart, userDataCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const cart = useFetch({
    url: user.isAuth ? URLS.userCart : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <CartContext.Provider value={{ cart }}>{children}</CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.element,
};
