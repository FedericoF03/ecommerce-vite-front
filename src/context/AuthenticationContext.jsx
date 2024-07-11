import { createContext } from "react";
import PropTypes from "prop-types";

import requestOptions from "../consts/requestOptions";
import URLS from "../consts/URLS";

import makeRequest from "../utils/makeRequest";
import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import { useUserAuth } from "../hooks/useUserAuth";

import { SiteProvider } from "./SiteContext";
import { FavProvider } from "./FavContext";
import { CartProvider } from "./CartContext";
import { BoughtProvider } from "./BoughtContext";

import { Fetcher } from "../test/components/models/Request/Fetcher";
import { HandlerErrorDefault } from "../test/components/models/HandlerError/HandlerErrorDefault";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = useUserAuth();
  const { isAuth, isLoading } = user;

  const windowLocationReplace = (requestResponseClass) => {
    if (checkInstanceIrequest(requestResponseClass))
      window.location.replace(requestResponseClass.response.url);
    else {
      window.location.search = "";
    }
  };

  const loginByApi = async (formData) => {
    const request = requestOptions.postAppJson;
    request.body = JSON.stringify({
      username: formData.userOREmail,
      password: formData.pass,
    });

    if (!isLoading && !isAuth) {
      await makeRequest(
        new Fetcher(URLS.authenticationByApi, request),
        new HandlerErrorDefault()
      ).then((response) => windowLocationReplace(response));
    }
  };

  const loginByMercadoLibre = async (search) => {
    if (!isLoading && !isAuth) {
      await makeRequest(
        new Fetcher(
          URLS.authenticationByMercadolibre + search,
          requestOptions.getBodyEncoded
        ),
        new HandlerErrorDefault()
      ).then((response) => windowLocationReplace(response));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginByApi, loginByMercadoLibre }}>
      {!isLoading && (
        <SiteProvider>
          <FavProvider>
            <CartProvider>
              <BoughtProvider>{children}</BoughtProvider>
            </CartProvider>
          </FavProvider>
        </SiteProvider>
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};
