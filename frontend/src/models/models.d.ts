declare type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

declare type LLMSettings = {
  temperature: number;
  nucleusSampling: number;
};

declare type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
};