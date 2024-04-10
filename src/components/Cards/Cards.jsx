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
    return (
      <CardCart
        item={props.item}
        setTotals={props.setTotals}
        index={props.index}
      />
    );
  else if (pathname.includes("favorite")) return <CardFav item={props.item} />;
  else if (pathname.includes("history"))
    return <CardHistory item={props.item} />;
  else if (pathname.includes("boughts"))
    return <CardBoughts bought={props.bought} />;
  else
    return (
      <CardBought
        listData={props.listData}
        handlerList={props.handlerList}
        item={props.item}
      />
    );
};

Cards.propTypes = {
  props: PropTypes.object,
  item: PropTypes.object,
  index: PropTypes.number,
  setTotals: PropTypes.func,
  handlerList: PropTypes.func,
  listData: PropTypes.object,
  bought: PropTypes.object,
};

export default Cards;
