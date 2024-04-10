import Cards from "../components/Cards/Cards";

import useDependency from "../hooks/useDependency";
import { useFetch } from "../hooks/useFetch";
import usePagination from "../hooks/usePagination";

import requests from "../assets/consts/request";

const History = () => {
  const history = useFetch({
    url: "http://localhost:3005/user/history",
    config: requests.getURLencoded,
  });
  const { pagination } = usePagination({ limitSet: 3 });

  const ids =
    history.data.status === "authorized" &&
    history.data.result &&
    history.data.result
      .map((el, i) =>
        pagination.offset <= i < 20 + pagination.offset ? el.item_id : ""
      )
      .join();

  const products = useFetch({
    url: `http://localhost:3005/products/item?ids=${ids}`,
    config: requests.getURLencoded,
    status: "depend waiting",
  });

  useDependency(history, products.setData);

  const productsCheck =
    products.data.status === "authorized" &&
    products.data.result &&
    products.data.result.map((el) => ({
      ...el.body,
      ...history.data.result.find((elsec) => elsec.item_id === el.body.id),
    }));

  return (
    <main className="background-color--b background-size--100vh">
      {productsCheck &&
        productsCheck
          .sort(
            (a, b) =>
              new Date(a.bookmarked_date).getMonth() -
              new Date(b.bookmarked_date).getMonth()
          )
          .map((el) => <Cards key={el.id} typeCard={"History"} item={el} />)}
    </main>
  );
};

export default History;
