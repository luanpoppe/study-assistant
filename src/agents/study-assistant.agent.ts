import "../utils/env";
import { Agent } from "@mastra/core";
import { mcpClient } from "../mcp_server/client";
import { google } from "@ai-sdk/google";

export const studyAgent = new Agent({
  name: "Study Agent",
  instructions:
    "You are an assistant that uses the available tools to answer questions.",
  model: google("gemini-2.5-flash-lite"),
  tools: async () => await mcpClient.getTools(),
});
