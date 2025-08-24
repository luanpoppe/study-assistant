import { MCPNamesEnum } from "../mcp_server/mcp-names-enum";
import { VersionedPrompts } from "./types";

export const mcpPrompts: Record<MCPNamesEnum, VersionedPrompts> = {
  summarize: {
    v1: (content: string) =>
      `Summarize the content in a structured format, as markdown, with topics and sub-topics\nContent: ${content}`,
  },

  "create-flashcards": {
    v1: (content: string) =>
      `Create a list of flashcards from the content\nContent: ${content}`,
  },
};
