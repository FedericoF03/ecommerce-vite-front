import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthenticationContext";

const useCountry = () => {
  const { user } = useContext(AuthContext);
  const [country, setCountry] = useState(user.isAuth ? "MLA" : "");
  const handlerCountry = (value) => setCountry(value);
  
  return {
    country,
    handlerCountry,
  };
};

export default useCountry;
