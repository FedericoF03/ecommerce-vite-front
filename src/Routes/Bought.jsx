import { useLocation } from "react-router-dom";
import { useContext } from "react";
import uuid from "react-uuid";

import requestOptions from "../consts/requestOptions";
import URLS from "../consts/URLS";

import checkInstanceIrequest from "../utils/checkInstanceIrequest";

import { BoughtContext } from "../context/BoughtContext";

// import usePagination from "../hooks/usePagination";
import useFetch from "../hooks/useFetch";

import Cards from "../components/Cards/Cards";

const Bought = () => {
  const { boughts } = useContext(BoughtContext);
  const params = useLocation();
  const query = new URLSearchParams(params.search);
  const boughtId = query.get("bought");
  // const { pagination } = usePagination([3]);

  const items = useFetch({
    url: checkInstanceIrequest(boughts.data)
      ? URLS.items +
        `?ids=${boughts.data.response.orders
          .find((bought) => boughtId === bought._id)
          .items.map((item) => item.item_id)
          .join(", ")}`
      : "",
    options: requestOptions.getBodyEncoded,
  });

  return (
    <div className="conteiner-data-carts">
      {checkInstanceIrequest(items.data) && (
        <>
          {items.data.response.length > 0 &&
            items.data.response.map((item) => (
              <Cards product={item.body} key={uuid()} />
            ))}
        </>
      )}
    </div>
  );
};

export default Bought;
