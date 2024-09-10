import WebSocket from "socket.io-client";
import { useState, createContext, useContext } from "react";
import { CHAT, URL } from "./constant";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);

  const connectWs = () => {
    setWs(WebSocket(URL));
  };

  const sendMessage = (message) => {
    if (ws && message.content.trim() !== "") {
      ws.emit(
        CHAT,
        `${message.userName}:${message.content}:${new Date().getTime()}`
      );
    }
  };

  return (
    <SocketContext.Provider
      value={{
        ws,
        connectWs,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(SocketContext);
};
