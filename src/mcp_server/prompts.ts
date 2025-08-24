import type { MCPServerPrompts } from "@mastra/mcp";
import type { Prompt, PromptMessage } from "@modelcontextprotocol/sdk/types.js";
import { MCPNamesEnum } from "./types";
import { mcpPrompts } from "../prompts/mcp.prompt";

export class MCPPrompts {
  static prompts: Prompt[] = [
    {
      name: MCPNamesEnum.SUMMARIZE,
      description: "Summarize a content",
      version: "v1",
    },
    {
      name: MCPNamesEnum.CREATE_FLASHCARDS,
      description: "Create flashcards of a content",
      version: "v1",
    },
  ];

  static myPromptHandlers: MCPServerPrompts = {
    listPrompts: async () => this.prompts,

    getPromptMessages: async ({ name, version, args }) => {
      this.checkIfIsValid(name);

      const prompt = this.getPromptByVersion(
        name as MCPNamesEnum,
        version as `v${number}`,
        args
      );

      return [
        {
          role: "user",
          content: {
            type: "text",
            text: prompt,
          },
        },
      ];

      // return {
      //   prompt,
      //   messages: [
      //     {
      //       role: "user",
      //       content: {
      //         type: "text",
      //         text: `Analyze this code with the new logic: ${args.code}`,
      //       },
      //     },
      //   ],
      // };
    },
  };

  static getPromptByVersion(
    name: MCPNamesEnum,
    version: `v${number}`,
    args: any
  ) {
    const rawPrompt = mcpPrompts[name][version];
    if (!rawPrompt) throw new Error("Prompt version not found");
    const prompt =
      typeof rawPrompt == "string" ? rawPrompt : rawPrompt(args.content);

    return prompt;
  }

  static checkIfIsValid(name: string) {
    const isNameValid = Object.values(MCPNamesEnum).includes(
      name as MCPNamesEnum
    );
    if (!isNameValid) throw new Error("Prompt not found");
  }
}
