import { SocketProvider } from "./socketProvider";
import { Chat } from "./chat";
import "./App.css";

function App() {
  return (
    <SocketProvider>
      <selection className="layout">
        <Chat />
      </selection>
    </SocketProvider>
  );
}

export default App;
