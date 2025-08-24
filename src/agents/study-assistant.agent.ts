import "../utils/env";
import { Agent } from "@mastra/core";
import { mcpClient } from "../mcp_server/client";
import { google } from "@ai-sdk/google";
import { StudyAssistantPrompt } from "./study-assistant.prompt";

export const studyAgent = new Agent({
  name: "Study Agent",
  instructions: StudyAssistantPrompt.prompt,
  model: google("gemini-2.5-flash-lite"),
  tools: async () => await mcpClient.getTools(),
});
