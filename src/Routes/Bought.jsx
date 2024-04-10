import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";

import Cards from "../components/Cards/Cards";

import { BoughtContext } from "../context/BoughtContext";

import usePagination from "../hooks/usePagination";
import { useFetch } from "../hooks/useFetch";
import requests from "../assets/consts/request";

const Bought = () => {
  const bought = useContext(BoughtContext);
  const params = useLocation();
  const query = new URLSearchParams(params.search);
  const boughtId = query.get("bought");
  const { pagination } = usePagination({ limitSet: 3 });
  const [listData, setListData] = useState({
    details: { display: null },
    menu: { display: null },
    menuOpinion: { display: null },
    opinionCreate: { display: null },
    menuReport: { display: null },
  });

  const handlerList = ({ e, item }) => {
    //controla los modals
    e.preventDefault();
    const attributeToUse = e.target.attributes["data-name"].value;
    setListData((ant) => ({
      ...ant,
      [attributeToUse]: {
        display: item || !ant[attributeToUse].display,
      },
    }));
  };
  //controla los modals
  const order =
    bought.data.status === "authorized" &&
    bought.data.result &&
    bought.data.result.orders.find((el) => el._id === boughtId);

  const ids =
    order &&
    order.items
      .map((el, i) =>
        pagination.offset <= i < 20 + pagination.offset ? el.item_id : ""
      )
      .join();

  const boughtItems = useFetch({
    url: `http://localhost:3005/products/item?ids=${ids}`,
    config: requests.getURLencoded,
    status: "depending waiting",
  });

  const boughtSetter = boughtItems.setData;

  useEffect(() => {
    boughtSetter((cartState) => ({ ...cartState, status: "wait" }));
  }, [ids, boughtSetter]);

  return (
    <div className="conteiner-data-carts">
      {boughtItems.data.status === "authorized" && order.items && (
        <>
          {boughtItems.data.result &&
            boughtItems.data.result.length > 0 &&
            boughtItems.data.result.map(
              (item) =>
                ((!listData.details.display && !listData.menu.display) ||
                  item.body.id === listData.details.display ||
                  item.body.id === listData.menu.display) && (
                  <Cards
                    listData={listData}
                    handlerList={handlerList}
                    item={{
                      ...item.body,
                      ...order.items.find(
                        (orderItem) => orderItem.item_id === item.body.id
                      ),
                    }}
                    key={item.body.id + uuid()}
                  />
                )
            )}
        </>
      )}
    </div>
  );
};

export default Bought;
