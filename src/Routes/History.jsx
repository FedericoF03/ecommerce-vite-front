import { useContext } from "react";
import uuid from "react-uuid";

import { AuthContext } from "../context/AuthenticationContext";

import URLS from "../consts/URLS";
import requestOptions from "../consts/requestOptions";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import useFetch from "../hooks/useFetch";

import Cards from "../components/Cards/Cards";

const History = () => {
  const { user } = useContext(AuthContext);

  const history = useFetch({
    url: user.isAuth ? URLS.history : "",
    options: requestOptions.getBodyEncoded,
  });

  const products = useFetch({
    url:
      checkInstanceIrequest(history.data) && history.data.response.length > 0
        ? URLS.items +
          `?ids=${history.data.response.map((item) => item.item_id).join(", ")}`
        : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <main className="background-color--b background-size--100vh">
      {checkInstanceIrequest(products.data) &&
        products.data.response.map((product) => (
          <Cards key={uuid()} typeCard={"History"} product={product.body} />
        ))}
    </main>
  );
};

export default History;
