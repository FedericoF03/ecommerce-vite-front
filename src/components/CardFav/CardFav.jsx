import { useContext } from "react";
import "./CardFav.css";
import { FavContext } from "../../context/FavContext";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
const CardFav = ({ item }) => {
  const fav = useContext(FavContext);

  return (
    item && (
      <div className="card-fav display--flex justify-content--s-a">
        <div className="card-cart__img-product">
          <img src={item.thumbnail} alt="item image" />
        </div>
        <div className="card-fav__conteiner-controllers justify-content--center">
          <p className="width--70p card-fav__product-name">{item.title}</p>
          <button
            className="card-fav__buttons"
            onClick={() => fav.updateFav({ item_id: item.id })}
          >
            Delete
          </button>
          <button className="card-fav__buttons">
            <Link to={`/product/${item.id}`}>Cart</Link>
          </button>
        </div>
      </div>
    )
  );
};

CardFav.propTypes = {
  item: PropTypes.object,
};

export default CardFav;
