import { useContext } from "react";
import { FavContext } from "../../context/FavContext";
import PropTypes from "prop-types";
const ButtonFav = ({ id }) => {
  const favContext = useContext(FavContext);

  return <div data-id={id}>{`<3`}</div>;
};

ButtonFav.propTypes = {
  id: PropTypes.string,
};

export default ButtonFav;
