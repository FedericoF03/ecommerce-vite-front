import { createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "./AuthenticationContext";

import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const { data, setData } = useFetch({
    url: "http://localhost:3005/user/favorite",
    config: requests.getURLencoded,
    status: "depend waiting",
  });

  useEffect(() => {
    if (auth.data.status === "failed")
      setData((c) => ({ ...c, status: "failed" }));
    else if (auth.data.status === "authorized")
      setData((c) => ({ ...c, status: auth.initStateFetch.status }));
  }, [setData, auth.data.status, auth.initStateFetch.status]);

  const updateFav = async (obj, checkController = "") => {
    try {
      if (checkController && !checkController.check) {
        const req = await fetch("http://localhost:3005/user/favorite", {
          ...requests.postAppJson,
          body: JSON.stringify(obj),
        });
        req.json().then((el) => {
          setData((c) => ({ ...c, result: [...c.result, el] }));
          checkController && checkController.setCheck(true);
        });
      } else {
        const req = await fetch("http://localhost:3005/user/favorite", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        });
        req.json().then((el) => {
          setData((c) => ({
            ...c,
            result: data.result.filter((old) => old.item_id !== el.item_id),
          }));
          checkController && checkController.setCheck(false);
        });
      }
    } catch (error) {
      console.log(error);
      checkController && checkController.setCheck((c) => c);
      setData((c) => ({ ...c, error: error }));
    }
  };

  return (
    <FavContext.Provider value={{ data, updateFav }}>
      {children}
    </FavContext.Provider>
  );
};

FavProvider.propTypes = {
  children: PropTypes.element,
};
