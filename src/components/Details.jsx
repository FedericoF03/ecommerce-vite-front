import { PropTypes } from "prop-types";

const Details = ({ product }) => {
  return (
    <div>
      <p data-name={"details"} onClick={(e) => {}}>
        {"<--"}
      </p>
      <div>
        <div className="display--flex">
          <p>Producto</p>
          <p>{product.price}</p>
        </div>
        <div className="display--flex">
          <p>Total</p>
          <p>{product.price}</p>
        </div>
      </div>
      <div>
        Detalles del pago
        <div>
          <div className="display--flex flex-direction--column">
            {product.quantity}
          </div>
          <div className="display--flex flex-direction--column">
            {product.bookmarked_date}
          </div>
        </div>
      </div>
      <div>
        Detalles del envio
        <div>Ubi</div>
        <div>
          <div className="display--flex flex-direction--column">
            {product.title}
            {product.quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  product: PropTypes.object,
};
export default Details;
