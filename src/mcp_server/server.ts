import { MCPServer } from "@mastra/mcp";
import { MCPPrompts } from "./prompts";

import express from "express";
import crypto from "crypto";
import { SummarizeTool } from "./tools/summarize.tool";
import { CreateFlashcardsTool } from "./tools/create-flashcards.tool";
import { SearchWebTool } from "./tools/search-web.tool";

export class MCP {
  static server = new MCPServer({
    name: "study-assistant",
    version: "1.0.0",
    tools: {
      "summarizer-tool": SummarizeTool.execute(),
      "create-flashcard-tool": CreateFlashcardsTool.execute(),
      "search-web-tool": SearchWebTool.execute(),
    },
    prompts: MCPPrompts.myPromptHandlers,
  });

  private static app = express();

  static initialize = async () => {
    this.app.all("/mcp*", async (req, res) => {
      try {
        await MCP.server.startHTTP({
          url: new URL(req.url || "", "http://localhost:8080"),
          httpPath: "/mcp",
          req,
          res,
          options: {
            sessionIdGenerator: () => crypto.randomUUID(),
          },
        });

        console.log("MCP Server ran successfully");
      } catch (err) {
        console.error("Erro no MCPServer:", err);
        res.status(500).send("Erro no MCPServer");
      }
    });

    this.app.listen(8080, () => console.log("Express rodando na porta 8080"));
  };
}
