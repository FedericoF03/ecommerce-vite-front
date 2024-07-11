import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import CardCart from "../CardCart/CardCart";
import CardFav from "../CardFav/CardFav";
import CardHistory from "../CardHistory/CardHistory";
import CardBoughts from "../CardBoughts/CardBoughts";
import CardBought from "../CardBought/CardBought";

const Cards = (props) => {
  const { pathname } = useLocation();

  if (pathname.includes("cart"))
    return <CardCart product={props.product} index={props.index} />;
  if (pathname.includes("favorite")) return <CardFav product={props.product} />;
  if (pathname.includes("history"))
    return <CardHistory product={props.product} />;
  if (pathname.includes("boughts"))
    return <CardBoughts bought={props.bought} />;
  else if (pathname.includes("bought"))
    return <CardBought product={props.product} />;
};

Cards.propTypes = {
  props: PropTypes.object,
  product: PropTypes.object,
  index: PropTypes.number,
  setTotals: PropTypes.func,
  handlerList: PropTypes.func,
  listData: PropTypes.object,
  bought: PropTypes.object,
};

export default Cards;
