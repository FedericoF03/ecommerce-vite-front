import { useContext, useState } from "react";
import { FavContext } from "../../context/FavContext";
import PropTypes from "prop-types";
const ButtonFav = ({ id }) => {
  const { data, updateFav } = useContext(FavContext);
  const [check, setCheck] = useState(
    data.status === "authorized" &&
      data.result.length > 0 &&
      data.result.some((el) => el.item_id === id)
  );
  
  const handlerFav = (e) => {
    e.stopPropagation();
    updateFav(
      { item_id: e.target.attributes["data-id"].value },
      { check, setCheck }
    );
  };

  return (
    <div data-id={id} onClick={(e) => handlerFav(e)}>
      {!check ? `<3` : `</3`}
    </div>
  );
};

ButtonFav.propTypes = {
  id: PropTypes.string,
};

export default ButtonFav;
