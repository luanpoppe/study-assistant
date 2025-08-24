import { createContext, PropsWithChildren, useContext, useState } from "react";

type States = {
  messages: Message[];
  setMessages: SetState<Message[]>;

  llmSettings: LLMSettings;
  setLLMSettings: SetState<LLMSettings>;

  error: string | null;
  setError: SetState<string | null>;
};

const ContextComponent = createContext<States>({} as any);
export const useGlobalContext = () => useContext(ContextComponent);

export function GlobalContext({ children }: PropsWithChildren) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [llmSettings, setLLMSettings] = useState<LLMSettings>({
    temperature: 0.7,
    nucleusSampling: 0.9,
  });
  const [error, setError] = useState<string | null>(null);

  const contextObj = {
    messages,
    setMessages,
    llmSettings,
    setLLMSettings,
    error,
    setError,
  };

  return (
    <ContextComponent.Provider value={contextObj}>
      {children}
    </ContextComponent.Provider>
  );
}
