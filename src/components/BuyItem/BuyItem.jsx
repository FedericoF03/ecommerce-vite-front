import { PropTypes } from "prop-types";

const BuyItem = ({ item }) => {
  return (
    <div>
      <img src={item.pictures[0].secure_url} />
      <p>{item.title}</p>
      <div>
        <button type="button" onClick={() => {}}>
          {"<"}
        </button>
        <p>Quantity: {item.quantity}</p>
        <button type="button" onClick={() => {}}>
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
