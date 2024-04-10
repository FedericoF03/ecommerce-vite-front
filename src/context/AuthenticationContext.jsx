import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

import { CartProvider } from "./CartContext";
import { BoughtProvider } from "./BoughtContext";
import { FavProvider } from "./FavContext";

import { useFetch } from "../hooks/useFetch";

import requests from "../assets/consts/request";

const url = "http://localhost:3005/user/status";
const socketURL = `http://localhost:3006/user`;

const disconnectRequest = {
  url: `http://localhost:3005/authentication/disconnect`,
  config: { ...requests.getURLencoded },
  aborter: new AbortController(),
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, initStateFetch } = useFetch({
    url,
    config: requests.getURLencoded,
  });
  const [socketState, setSocketState] = useState(null);

  const disconnect = async () => {
    const { status } = data;
    if (status === "authorized") {
      const res = await fetch(disconnectRequest.url, {
        ...disconnectRequest.config,
        signal: disconnectRequest.aborter.signal,
      });
      if (res.status === 200) window.location.replace("/");
    }
  };

  useEffect(() => {
    if (data.status === "authorized") {
      const socket = io(socketURL, {
        autoConnect: false,
        auth: { token: data.result.id },
      });
      socket.connect();
      setSocketState(() => socket);
      return () => {
        socket.disconnect();
      };
    }
  }, [data]);

  useEffect(() => {
    if (socketState) {
      socketState.emit("joinRoom", data.result.nickname);
      socketState.on("saluda", (msgServer) => {
        console.log(msgServer);
      });
      return () => socketState.off("saluda");
    }
  }, [socketState, data.result]);

  return (
    <AuthContext.Provider
      value={{ data, disconnect, socket: socketState, initStateFetch }}
    >
      <CartProvider>
        <BoughtProvider>
          <FavProvider>{children}</FavProvider>
        </BoughtProvider>
      </CartProvider>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};
