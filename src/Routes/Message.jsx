import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ChatBubble from "../components/ChatBubble/ChatBubble";
import Chat from "../components/Chat/Chat";

import { AuthContext } from "../context/AuthenticationContext";

const Message = () => {
  const { socket } = useContext(AuthContext);
  const queries = new URLSearchParams(useLocation().search);
  const queryID = queries.get("aWQ");
  const [listData, setListData] = useState({
    chat: { display: queryID || null },
  });
  const [chats, setChats] = useState(null);
  const [chat, setChat] = useState(null);

  const clickChat = ({ id }) => socket.emit("chat", id);

  const handlerList = ({ e, item }) => {
    e.stopPropagation();
    const attributeToUse = e.target.attributes["data-name"].value;
    setListData((ant) => ({
      ...ant,
      [attributeToUse]: {
        display: item || !ant[attributeToUse].display,
      },
    }));
    if (item) clickChat({ id: item });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("chats");
      queryID && socket.emit("chat", queryID);
    }
  }, [socket, queryID]);

  useEffect(() => {
    if (socket) {
      socket.on("returnChats", (chatsData) => {
        // socket.emit("inLine", chatsData);
        // socket.on("inLine", (result) => setChats(result));
        setChats(() => chatsData);
      });
      socket.on("returnChat", (chatData) => setChat(chatData));
      socket.on("responseBot", (msg) => {
        setChat((ant) => {
          return {
            ...ant,
            chat: [
              ...ant.chat,
              {
                msg,
                send: 53453,
                visto: false,
                date: 1000,
              },
            ],
          };
        });
      });
      return () => {
        socket.off("returnChats");
        socket.off("returnChat");
        socket.off("responseBot");
      };
    }
  }, [socket]);

  // useEffect(() => {
  //   if (socket && chats) {
  //     socket.emit("inLine", chats);
  //     socket.on("inLine", (result) => setChats(result));
  //   }
  // }, [chats, socket]);

  return (
    <div>
      <div>
        {!listData.chat.display && (
          <ChatBubble chats={chats} handlerList={handlerList} />
        )}
        {listData.chat.display && chat && (
          <Chat
            setChat={setChat}
            chat={chat}
            chats={chats}
            handlerList={handlerList}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
