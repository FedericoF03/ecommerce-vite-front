import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { BoughtContext } from "../context/BoughtContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthenticationContext";
import BuyItem from "../components/BuyItem/BuyItem";
import MenuBuy from "../components/MenuBuy/MenuBuy";
import ConfirmedBuy from "../components/ConfirmedBuy/ConfirmedBuy";

const Buy = () => {
  const [searchParams] = useSearchParams();
  const boughts = useContext(BoughtContext);
  const auth = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [listItems, setListItems] = useState([]);
  const [process, setProcess] = useState("garanty");
  const [options, setOptions] = useState({});
  const [confirmBuy, setConfirmBuy] = useState(false);

  const total = listItems.reduce(
    (acc, next) => acc + parseInt(next.price) * parseInt(next.quantity),
    0
  );

  useEffect(() => {
    const cartList = async () => {
      if (searchParams.get("itemID")) {
        // Caso contrario solo busca el itemID
        const id = searchParams.get("itemID");
        const responseItems = await fetch(
          `http://localhost:3005/products/item?ids=${id}`
        );
        await responseItems.json().then((data) => {
          setListItems(() =>
            data.map((el) => ({
              ...el.body,
              quantity: parseInt(searchParams.get("quantity")),
              ...cartContext.data.result.items.find(
                (elsec) => elsec.item_id === el.body.id
              ),
            }))
          );
        });
      } else {
        setProcess("sent");
        let items = [];
        for (
          let lump = 0;
          lump < cartContext.data.result.items.length / 20;
          ++lump
        ) {
          const ids = cartContext.data.result.items.reduce(
            (acc, cur, i) =>
              lump * 20 <= i && i < (1 + lump) * 20
                ? `${acc},${cur.item_id}`
                : acc,

            ""
          );

          const responseItems = await fetch(
            `http://localhost:3005/products/item?ids=${ids}`
          );

          await responseItems.json().then((data) => {
            items = [
              ...items,
              ...data.map((el) => ({
                ...el.body,
                ...cartContext.data.result.items.find(
                  (elsec) => elsec.item_id === el.body.id
                ),
              })),
            ];
          });
        }
        setListItems(items);
      }
    };
    cartContext.data.status === "authorized" && cartList();
  }, [searchParams, cartContext.data.status, cartContext.data.result]);

  const dinamycBought = async () => {
    if (searchParams.get("itemID")) {
      const res = await boughts.boughtPost(listItems[0], options);
      if (!res) setConfirmBuy(!confirmBuy);
    } else {
      const res = await boughts.boughtPostAll(options);
      if (!res) setConfirmBuy(!confirmBuy);
    }
  };

  return (
    <div>
      {!confirmBuy && (
        <>
          <MenuBuy
            condition={
              process === "garanty" && searchParams.get("type") === "item"
            }
            handlerProcess={{ setProcess, titleProcess: "method_pay" }}
            setOptions={setOptions}
            options={options}
            title={"Garanty"}
            process={process}
            optionsChildren={["3 months", "6 months", "12 months"]}
          />
          <MenuBuy
            condition={process === "method_pay"}
            handlerProcess={{ setProcess, titleProcess: "sent" }}
            setOptions={setOptions}
            options={options}
            title={"Method Pay"}
            ant={"garanty"}
            process={process}
            optionsChildren={["target", "efective", "debit"]}
          />
          <MenuBuy
            condition={process === "sent"}
            handlerProcess={{ setProcess, titleProcess: "ready" }}
            setOptions={setOptions}
            options={options}
            title={"Sent"}
            ant={"methodPay"}
            process={process}
            optionsChildren={[
              `${auth.data.result.address.address || "my home"}`,
              "sucursal",
            ]}
          />
          <>
            {listItems.length > 0 &&
              listItems.map((item) => (
                <BuyItem
                  key={item.id}
                  item={item}
                  listItems={listItems}
                  setListItems={setListItems}
                />
              ))}
            <p>Total: {total}</p>
          </>
          {process === "ready" && (
            <button onClick={(e) => dinamycBought(e)}>buy</button>
          )}
        </>
      )}
      {confirmBuy && <ConfirmedBuy />}
    </div>
  );
};

export default Buy;
