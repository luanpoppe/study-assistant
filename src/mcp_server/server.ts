import { MCPServer } from "@mastra/mcp";
import { MCPPrompts } from "./prompts";

export class MCP {
  static server = new MCPServer({
    name: "study-assistant",
    version: "1.0.0",
    tools: {},
    prompts: MCPPrompts.myPromptHandlers,
  });

  static async initialize(req: any, res: any) {
    await this.server.startHTTP({
      httpPath: "/mcp",
      req,
      res,
      url: new URL("http://localhost:8080"),
    });
  }
}
