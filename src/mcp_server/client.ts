import { MCPClient } from "@mastra/mcp";

export const mcpClient = new MCPClient({
  servers: {
    ["study-assistant"]: {
      url: new URL("http://localhost:8080/mcp"),
    },
  },
});
