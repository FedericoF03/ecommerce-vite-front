import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./CardBought.css";
import Details from "../Details";
import MenuBought from "../MenuBought/MenuBought";

const CardBought = ({ item, handlerList, listData }) => {
  return (
    <>
      {!listData.details.display && !listData.menu.display && (
        <Link to={`/product/${item.id}`} className="card-bought display--flex">
          <div className="card-bought display--flex">
            <p className="card-bought__product-name width--70p">{item.title}</p>
            <img
              className="card-cart__img-product"
              src={item.thumbnail}
              alt=""
            />
            <div className="card-bought__conteiner-details">
              <p
                data-name={"details"}
                onClick={(e) => {
                  handlerList({ e, item: item.id });
                }}
                className="card-bought__details"
              >
                details
              </p>
              <p
                data-name={"menu"}
                onClick={(e) => {
                  handlerList({ e, item: item.id });
                }}
                className="card-bought__details"
              >
                help with
              </p>
            </div>
          </div>
        </Link>
      )}
      {listData.details.display === item.id && (
        <Details item={item} handlerList={handlerList} />
      )}
      {listData.menu.display === item.id && (
        <MenuBought listData={listData} item={item} handlerList={handlerList} />
      )}
    </>
  );
};

CardBought.propTypes = {
  item: PropTypes.object,
  handlerList: PropTypes.func,
  listData: PropTypes.object,
};

export default CardBought;
