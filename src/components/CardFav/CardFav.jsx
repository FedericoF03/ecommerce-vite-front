import "./CardFav.css";

import { useContext } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

import { FavContext } from "../../context/FavContext";

const CardFav = ({ product }) => {
  const fav = useContext(FavContext);
console.log(product)
  return (
    <div className="card-fav display--flex justify-content--s-a">
      <div className="card-cart__img-product">
        <img src={product.thumbnail} alt="item image" />
      </div>
      <div className="card-fav__conteiner-controllers justify-content--center">
        <p className="width--70p card-fav__product-name">{product.title}</p>
        <button
          className="card-fav__buttons"
          onClick={() => fav.updateFav({ item_id: product.id })}
        >
          Delete
        </button>
        <button className="card-fav__buttons">
          <Link to={`/product/${product.id}`}>Cart</Link>
        </button>
      </div>
    </div>
  );
};

CardFav.propTypes = {
  product: PropTypes.object,
};

export default CardFav;
