import { useState } from "react";
import { useLocation } from "react-router-dom";

import requests from "../assets/consts/request";

let number = 0;
const AuthenticationML = () => {
  const [error, setError] = useState("");
  const { search } = useLocation();

  const request = {
    url: `http://localhost:3005/authentication/meli${search}`,
    obj: requests.getURLencoded,
  };

  const fetchingAuth = async () => {
    error && setError(() => "");
    const getData = await fetch(request.url, request.obj);
    await getData.json().then((el) => {
      number = 0;
      if (el.status) window.location.replace(el.url);
      else {
        setError(() => "Hubo problemas al auth");
        window.location.search = "";
      }
    });
  };

  if (search && number < 1) {
    fetchingAuth();
    number++;
  }

  return (
    <button onClick={fetchingAuth} className="user-form__img">
      {error && <p>{error}</p>}
      <img src="/logoML.svg" alt="Logo-ML" />
    </button>
  );
};

export default AuthenticationML;
