"use client";

import { useState, useRef, type FormEvent } from "react";
import axios from "axios";
import {
  Copy,
  Loader2,
  Brain,
  Sparkles,
  MessageCircle,
  Trash2,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Slider } from "./components/ui/slider";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
};

type LLMSettings = {
  temperature: number;
  nucleusSampling: number;
};

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const [llmSettings, setLLMSettings] = useState<LLMSettings>({
    temperature: 0.7,
    nucleusSampling: 0.9,
  });

  function scrollToBottom() {
    setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }

  async function send(messageText: string) {
    if (!messageText.trim()) return;
    setError(null);
    const userMsg: Message = {
      id: String(Date.now()) + "-u",
      role: "user",
      text: messageText,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    scrollToBottom();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/study", {
        message: messageText,
        temperature: llmSettings.temperature,
        nucleus_sampling: llmSettings.nucleusSampling,
      });
      const answer = res.data?.answer ?? "No response from server.";
      const botMsg: Message = {
        id: String(Date.now()) + "-b",
        role: "assistant",
        text: answer,
      };
      setMessages((m) => [...m, botMsg]);
      scrollToBottom();
    } catch (err: any) {
      console.error("QA request error", err);
      setError(
        err?.response?.data?.error?.message ?? err?.message ?? "Unknown error"
      );
      const errMsg: Message = {
        id: String(Date.now()) + "-e",
        role: "assistant",
        text: "Error getting response. See message above.",
      };
      setMessages((m) => [...m, errMsg]);
      scrollToBottom();
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard?.writeText(text);
  }

  function clearConversation() {
    setMessages([]);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-blue-200 bg-transparent"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4" align="end">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">
                        LLM Parameters
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="temperature"
                          className="text-sm text-gray-700"
                        >
                          Temperature
                        </Label>
                        <span className="text-sm text-gray-500 font-mono">
                          {llmSettings.temperature.toFixed(2)}
                        </span>
                      </div>
                      <Slider
                        id="temperature"
                        min={0}
                        max={2}
                        step={0.1}
                        value={[llmSettings.temperature]}
                        onValueChange={(value: any) =>
                          setLLMSettings((prev) => ({
                            ...prev,
                            temperature: value[0],
                          }))
                        }
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Controls randomness. Lower = more focused, Higher = more
                        creative
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="nucleus"
                          className="text-sm text-gray-700"
                        >
                          Nucleus Sampling (Top-p)
                        </Label>
                        <span className="text-sm text-gray-500 font-mono">
                          {llmSettings.nucleusSampling.toFixed(2)}
                        </span>
                      </div>
                      <Slider
                        id="nucleus"
                        min={0.1}
                        max={1}
                        step={0.05}
                        value={[llmSettings.nucleusSampling]}
                        onValueChange={(value: any) =>
                          setLLMSettings((prev) => ({
                            ...prev,
                            nucleusSampling: value[0],
                          }))
                        }
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">
                        Controls diversity. Lower = more deterministic, Higher =
                        more varied
                      </p>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

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

      <div className="max-w-4xl mx-auto p-6">
        <div
          ref={ref}
          className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 h-96 overflow-auto mb-6 p-6"
          aria-live="polite"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-2xl flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How can I help you today?
              </h3>
              <p className="text-gray-600 max-w-md">
                Ask a question about your studies and get personalized answers
                from our AI assistant.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-4 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.role !== "user" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-sky-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-2xl ${
                      m.role === "user" ? "order-1" : ""
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl relative group transition-all duration-200 ${
                        m.role === "user"
                          ? "bg-gradient-to-br from-blue-500 to-sky-600 text-white ml-auto"
                          : "bg-white/80 backdrop-blur-sm border border-blue-100 text-gray-900"
                      }`}
                    >
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed m-0 font-sans">
                        {m.text}
                      </pre>
                      <button
                        aria-label="Copy"
                        onClick={() => copyToClipboard(m.text)}
                        className={`absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg transition-all duration-200 ${
                          m.role === "user"
                            ? "hover:bg-white/20 text-white/80 hover:text-white"
                            : "hover:bg-blue-50 text-gray-400 hover:text-blue-600"
                        }`}
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  {m.role === "user" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0 order-2">
                      <span className="text-white text-sm font-medium">U</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question about your studies..."
              className="w-full rounded-xl border border-blue-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-sky-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-sky-700 disabled:opacity-60 transition-all duration-200 shadow-lg hover:shadow-xl"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Send"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700">Erro: {error}</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-blue-100">
          <p className="text-xs text-gray-600 text-center">
            💡 <strong>Tip:</strong> Ask specific questions about your studies
            to get more precise and useful answers.
          </p>
        </div>
      </div>
    </div>
  );
}
