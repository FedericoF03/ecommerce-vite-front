import { PropTypes } from "prop-types";

const Details = ({ item, handlerList }) => {
  return (
    <div>
      <p data-name={"details"} onClick={(e) => handlerList({ e })}>
        {"<--"}
      </p>
      <div>
        <div className="display--flex">
          <p>Producto</p>
          <p>{item.price}</p>
        </div>
        <div className="display--flex">
          <p>Total</p>
          <p>{item.price}</p>
        </div>
      </div>
      <div>
        Detalles del pago
        <div>
          <div className="display--flex flex-direction--column">
            {item.quantity}
          </div>
          <div className="display--flex flex-direction--column">
            {item.bookmarked_date}
          </div>
        </div>
      </div>
      <div>
        Detalles del envio
        <div>Ubi</div>
        <div>
          <div className="display--flex flex-direction--column">
            {item.title}
            {item.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  item: PropTypes.object,
  handlerList: PropTypes.func,
};
export default Details;
