import { createContext, useContext } from "react";
import PropTypes from "prop-types";

import requestOptions from "../consts/requestOptions";
import URLS from "../consts/URLS";

import useFetch from "../hooks/useFetch";

import { AuthContext } from "./AuthenticationContext";

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const userFavorites = useFetch({
    url: user.isAuth ? URLS.favorites : "",
    options: requestOptions.getBodyEncoded,
  });

  // const updateFav = async () => {
  //   try {
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <FavContext.Provider value={{ userFavorites }}>
      {children}
    </FavContext.Provider>
  );
};

FavProvider.propTypes = {
  children: PropTypes.element,
};
