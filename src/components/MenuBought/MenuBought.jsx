import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import MenuOpinion from "../MenuOpinion/MenuOpinion";
import MenuReport from "../MenuReport/MenuReport";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthenticationContext";

const MenuBought = ({ item, handlerList, listData }) => {
  const { socket, data } = useContext(AuthContext);
  const navigate = useNavigate();

  const createChat = () => {
    if (socket) {
      socket.once().emit("createChat", {
        to: item.seller_id,
        username: data.result.nickname,
        usernameTO: item.domain_id,
        itemID: item._id
      });
    }
  };

  useEffect(() => {
    socket &&
      socket.on("createChatReturn", (data) => navigate(`/message?aWQ=${data}`));
  }, [socket, navigate]);

  return (
    <div className="background-size--100vh">
      <p data-name={"menu"} onClick={(e) => handlerList({ e })}>
        {"<--"}
      </p>
      <p>status</p>
      <Link to={`/product/${item.id}`}>Return to buy</Link>
      <div className="display--flex">
        <p data-name={"menuOpinion"} onClick={(e) => handlerList({ e })}>
          Opinion for product
        </p>
        {listData.menuOpinion.display && (
          <MenuOpinion
            item={item}
            handlerList={handlerList}
            listData={listData}
          />
        )}
        <p data-name={"menuReport"} onClick={(e) => handlerList({ e })}>
          report problem
        </p>
        {listData.menuReport.display && (
          <MenuReport item={item} handlerList={handlerList} />
        )}
      </div>
      <div className="display--flex">
        <p onClick={createChat}>Message for seller</p>
      </div>
    </div>
  );
};
MenuBought.propTypes = {
  item: PropTypes.object,
  handlerList: PropTypes.func,
  listData: PropTypes.object,
};
export default MenuBought;
