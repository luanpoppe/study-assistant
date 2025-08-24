import { Header } from "./components/Header";
import { Chat } from "./components/Chat";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <Header />

      <Chat />
    </div>
  );
}
