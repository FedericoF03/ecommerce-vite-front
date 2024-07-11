import "./CardBought.css";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Details from "../Details";
import MenuBought from "../MenuBought/MenuBought";

const CardBought = ({ product }) => {
  return (
    <>
      {
        <Link
          to={`/product/${product.id}`}
          className="card-bought display--flex"
        >
          <div className="card-bought display--flex">
            <p className="card-bought__product-name width--70p">
              {product.title}
            </p>
            <img
              className="card-cart__img-product"
              src={product.thumbnail}
              alt=""
            />
            <div className="card-bought__conteiner-details">
              <p
                data-name={"details"}
                onClick={(e) => {}}
                className="card-bought__details"
              >
                details
              </p>
              <p
                data-name={"menu"}
                onClick={(e) => {}}
                className="card-bought__details"
              >
                help with
              </p>
            </div>
          </div>
        </Link>
      }
      {<Details product={product} />}
      {<MenuBought product={product} />}
    </>
  );
};

CardBought.propTypes = {
  product: PropTypes.object,
};

export default CardBought;
