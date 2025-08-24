import { useGlobalContext } from "@/GlobalContext";
import axios from "axios";
import { MutableRefObject } from "react";

export function useSendMessage(
  messageText: string,
  ref: MutableRefObject<HTMLDivElement | null>,
  setInput: SetState<string>,
  setLoading: SetState<boolean>
) {
  const { llmSettings, setMessages, setError } = useGlobalContext();

  function scrollToBottom() {
    setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }, 50);
  }

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

  async function execute() {
    try {
      const res = await axios.post("http://localhost:5000/study", {
        message: messageText,
        temperature: llmSettings.temperature,
        nucleusSampling: llmSettings.nucleusSampling,
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

  execute();
}
