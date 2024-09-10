import { useEffect, useState } from "react";
import { useWebSocket } from "./socketProvider";
import { CHAT } from "./constant";
import { format } from "date-fns";
import "./chat.css";

const splitMessage = (msg) => {
  const splitArr = msg.split(":");
  const [name, content, timeStamp] = splitArr;
  console.log("timeStamp", timeStamp);
  const time = format(new Date(parseInt(timeStamp)), "HH:mm");
  return { name, content, time };
};

export const Chat = () => {
  const { connectWs, sendMessage, ws } = useWebSocket();
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState([]);

  const action = () => {
    sendMessage({
      userName,
      content: message,
    });
    setMessage("");
  };

  useEffect(() => {
    if (ws) {
      ws.on(CHAT, (msg) => {
        const result = splitMessage(msg);

        let self = false;

        if (result.name === userName) self = true;

        setMessages((prev) => [...prev, { ...result, self }]);
      });
    }
  }, [ws]);

  return (
    <div className="content">
      <div className="flexBox">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="輸入名稱..."
        />
        <button className="btn" onClick={() => connectWs()}>
          連接
        </button>
      </div>
      <div className="chatBox">
        {messages.map((msg, index) => (
          <div key={index} className={`chatMessage ${msg.self ? "me" : ""}`}>
            <span className="time">{msg.time}</span>
            <span className="messageContent">{msg.content}</span>
          </div>
        ))}
        <div className="chatInput">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && action()}
            placeholder="輸入消息..."
          />
        </div>
      </div>
    </div>
  );
};
