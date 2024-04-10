import { PropTypes } from "prop-types";
import uuid from "react-uuid";

const ChatBubble = ({ handlerList, chats }) => {
  return (
    <section>
      {chats &&
        chats.map((el) => (
          <div
            key={uuid()}
            data-name={"chat"}
            onClick={(e) => handlerList({ e, item: el._id })}
            className="display--flex"
          >
            {/* <p>{el.connected ? "T": "F"}</p> */}
            <img
              data-name={"chat"}
              onClick={(e) => handlerList({ e, item: el._id })}
              style={{ maxHeight: "80%", width: "30%", padding: "1rem" }}
              src="https://mla-s1-p.mlstatic.com/600487-MLA53813172150_022023-O.jpg"
              alt="image user"
            />
            <p
              data-name={"chat"}
              onClick={(e) => handlerList({ e, item: el._id })}
            >
              {el.to.username}
            </p>
            <div
              data-name={"chat"}
              onClick={(e) => handlerList({ e, item: el._id })}
              style={{
                maxHeight: "80%",
                width: "70%",
                padding: "1rem",
                justifyContent: "space-between",
              }}
              className="display--flex"
            >
              <p
                data-name={"chat"}
                onClick={(e) => handlerList({ e, item: el._id })}
              >
                Last message
              </p>
              <p
                data-name={"chat"}
                onClick={(e) => handlerList({ e, item: el._id })}
              >
                Date
              </p>
            </div>
          </div>
        ))}
    </section>
  );
};

ChatBubble.propTypes = {
  handlerList: PropTypes.func,
  chats: PropTypes.array,
};
export default ChatBubble;
