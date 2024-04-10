import { PropTypes } from "prop-types";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

const BuyItem = ({ item, listItems, setListItems }) => {
  const cartContext = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const rest = () => {
    if (!loading) {
      setLoading(true);
      setListItems(
        listItems.map((listItemState) => {
          const existIncART = cartContext.data.result.items.some(
            (itemCart) => itemCart.item_id === item.id
          );
          const quantity = item.quantity > 0 ? item.quantity - 1 : 0;
          if (existIncART) {
            (async () => {
              await cartContext.updateCart({
                item_id: item.id,
                quantity,
              });
            })();
          }
          setLoading(false);
          return {
            ...listItemState,
            quantity,
          };
        })
      );
    }
  };

  const suma = () => {
    if (!loading) {
      setLoading(true);
      !loading &&
        setListItems(
          listItems.map((listItemState) => {
            const existIncART = cartContext.data.result.items.some(
              (itemCart) => itemCart.item_id === item.id
            );
            const quantity =
              item.initial_quantity > item.quantity
                ? item.quantity + 1
                : item.initial_quantity;
            if (existIncART) {
              (async () => {
                await cartContext.updateCart({
                  item_id: item.id,
                  quantity,
                });
                setLoading(false);
              })();
            } else setLoading(false);
            return {
              ...listItemState,
              quantity,
            };
          })
        );
    }
  };

  return (
    <div>
      <img src={item.pictures[0].secure_url} />
      <p>{item.title}</p>
      <div>
        <button type="button" onClick={rest}>
          {"<"}
        </button>
        <p>Quantity: {item.quantity}</p>
        <button type="button" onClick={suma}>
          {">"}
        </button>
      </div>

      <p>Price: ${item.price}</p>
      {item.sentPrice && <p>Sent price: ${item.sentPrice}</p>}
    </div>
  );
};
BuyItem.propTypes = {
  item: PropTypes.object,
  quantity: PropTypes.number,
  params: PropTypes.object,
  listItems: PropTypes.array,
  setListItems: PropTypes.func,
};
export default BuyItem;
