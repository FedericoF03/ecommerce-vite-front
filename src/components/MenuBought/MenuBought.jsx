import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";

import { useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthenticationContext";

import MenuOpinion from "../MenuOpinion/MenuOpinion";
import MenuReport from "../MenuReport/MenuReport";

const MenuBought = ({ product }) => {
  const { socket, data } = useContext(AuthContext);
  const navigate = useNavigate();

  const createChat = () => {
    if (socket) {
      socket.once().emit("createChat", {
        to: product.seller_id,
        username: data.result.nickname,
        usernameTO: product.domain_id,
        itemID: product._id,
      });
    }
  };

  useEffect(() => {
    socket &&
      socket.on("createChatReturn", (data) => navigate(`/message?aWQ=${data}`));
  }, [socket, navigate]);

  return (
    <div className="background-size--100vh">
      <p data-name={"menu"} onClick={(e) => {}}>
        {"<--"}
      </p>
      <p>status</p>
      <Link to={`/product/${product.id}`}>Return to buy</Link>
      <div className="display--flex">
        <p data-name={"menuOpinion"} onClick={(e) => {}}>
          Opinion for product
        </p>
        {<MenuOpinion product={product} />}
        <p data-name={"menuReport"} onClick={(e) => {}}>
          report problem
        </p>
        {<MenuReport product={product} />}
      </div>
      <div className="display--flex">
        <p onClick={createChat}>Message for seller</p>
      </div>
    </div>
  );
};
MenuBought.propTypes = {
  product: PropTypes.object,
  handlerList: PropTypes.func,
  listData: PropTypes.object,
};
export default MenuBought;
