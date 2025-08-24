import { MCPServer } from "@mastra/mcp";
import { MCPPrompts } from "./prompts";

import express from "express";
import crypto from "crypto";

export class MCP {
  static server = new MCPServer({
    name: "study-assistant",
    version: "1.0.0",
    tools: {},
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

// const app = express();
// app.all("/mcp*", async (req, res) => {
//   try {
//     await MCP.server.startHTTP({
//       url: new URL(req.url || "", "http://localhost:8080"),
//       httpPath: "/mcp",
//       req,
//       res,
//       options: {
//         sessionIdGenerator: () => crypto.randomUUID(),
//       },
//     });

//     console.log("MCP Server ran successfully");
//   } catch (err) {
//     console.error("Erro no MCPServer:", err);
//     res.status(500).send("Erro no MCPServer");
//   }
// });

// app.listen(8080, () => console.log("Express rodando na porta 8080"));
