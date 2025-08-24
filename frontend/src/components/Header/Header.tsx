import { Brain, Trash2 } from "lucide-react";
import { LLMSettings } from "./LLMSettings";
import { useGlobalContext } from "@/GlobalContext";

export function Header() {
  const { messages, llmSettings, setLLMSettings, setMessages, setError } =
    useGlobalContext();

  function clearConversation() {
    setMessages([]);
    setError(null);
  }

  return (
    <div className="sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Study Assistant
              </h1>
              <p className="text-sm text-gray-600">Powered by AI</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LLMSettings
              llmSettings={llmSettings}
              setLLMSettings={setLLMSettings}
            />

            {messages.length > 0 && (
              <button
                onClick={clearConversation}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                aria-label="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            )}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">Connected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
