import { Header } from "./components/Header";
import { Chat } from "./components/Chat";
import { useEffect } from "react";
import { UserIdLocalStorage } from "./lib/local-storage/user-id.local-storage";
import { ConversationIdLocalStorage } from "./lib/local-storage/conversation-id.local-storage";

export default function App() {
  useEffect(() => {
    UserIdLocalStorage.setOnlyIfEmpty();
    ConversationIdLocalStorage.set();
  }, []);

  return (
    <div>
      <Header />

      <Chat />
    </div>
  );
}
