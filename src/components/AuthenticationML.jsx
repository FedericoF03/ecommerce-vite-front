import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../context/AuthenticationContext";

const AuthenticationML = () => {
  const { loginByMercadoLibre } = useContext(AuthContext);

  const { search } = useLocation();

  useEffect(() => {
    search.includes("code") && loginByMercadoLibre(search);
  }, [search, loginByMercadoLibre]);

  return (
    <button onClick={() => loginByMercadoLibre(search)} className="user-form__img">
      <img src="/logoML.svg" alt="Logo-ML" />
    </button>
  );
};

export default AuthenticationML;
