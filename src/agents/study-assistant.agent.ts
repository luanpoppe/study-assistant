import { Agent } from "@mastra/core";
import { mcpClient } from "../mcp_server/client";
import { google } from "@ai-sdk/google";

export const agent = new Agent({
  name: "BackendAgent",
  instructions:
    "You are an assistant that uses the available tools to answer questions.",
  model: google("gemini-2.5-flash-lite"),
  tools: async () => {
    return await mcpClient.getTools();
  },
});
