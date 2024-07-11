import "./ProductCard.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import ButtonFav from "../ButtonFav/ButtonFav";
import { AuthContext } from "../../context/AuthenticationContext";
import { useContext } from "react";

const ProductCard = ({ data: { title, thumbnail, price, id } }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <article
      className="product-card"
      onClick={() => navigate(`/product/${id}`)}
    >
      {user.isAuth && <ButtonFav id={id} />}
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
