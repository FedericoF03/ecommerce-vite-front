import { useContext, useState } from "react";
import uuid from "react-uuid";
import { PropTypes } from "prop-types";

import { AuthContext } from "../../context/AuthenticationContext";

const Chat = ({ handlerList, chat, setChat }) => {
  const [input, setInput] = useState({
    message: "",
  });
  const { data, socket } = useContext(AuthContext);

  const submit = () => {
    const to = chat.users.find((el) => el.id !== data.result.id);
    input.message.length > 0 &&
      socket &&
      socket.emit("sendMessage", {
        msg: input.message,
        to: to.id,
        username: data.result.nickname,
        usernameTO: to.username,
      });
    setChat((ant) => {
      return {
        ...ant,
        chat: [
          ...ant.chat,
          {
            msg: input.message,
            send: data.result.id,
            visto: false,
            date: 1000,
          },
        ],
      };
    });
    setInput({ message: "" });
  };

  return (
    <div>
      <p data-name={"chat"} onClick={(e) => handlerList({ e })}>
        {"<----"}
      </p>
      <div>
        {chat.chat.map((el) => (
          <div
            key={uuid()}
            className="display--flex"
            style={{
              width: "100%",
              color: data.result?.id === el.send ? "blue" : "red",
              justifyContent:
                data.result?.id === el.send ? "flex-end" : "flex-start",
            }}
          >
            <p>{el.msg}</p>
            <p>{el.date}</p>
            <p>{el.visto ? "v" : "n"}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input.message}
        onChange={(e) => setInput({ message: e.target.value })}
      />
      <input type="button" value="submit" onClick={submit} />
    </div>
  );
};

Chat.propTypes = {
  handlerList: PropTypes.func,
  chats: PropTypes.array,
  chat: PropTypes.object,
  setChat: PropTypes.func,
};

export default Chat;
