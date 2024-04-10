import "./ProductCard.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import ButtonFav from "../ButtonFav/ButtonFav";

const ProductCard = ({
  data: { title, thumbnail, price: priceProduct, id },
  currency,
}) => {
  const navigate = useNavigate();
  const price =
    currency.data.status === "authorized" &&
    currency.data.result.symbol +
      priceProduct
        .toFixed(currency.data.result.decimal_places)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (
    <article
      className="product-card"
      onClick={() => navigate(`/product/${id}`)}
    >
      <ButtonFav id={id} />
      <img className="product-card__img" src={thumbnail} />
      <div className="product-card__conteiner-data">
        <p className="product-card__name">{title}</p>
        <p className="product-card__price">{price}</p>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  data: PropTypes.object,
  img: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.object,
};

export default ProductCard;
