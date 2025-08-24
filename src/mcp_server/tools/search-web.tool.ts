import "../../utils/env";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Tavily } from "../../libs/tavily";

export class SearchWebTool {
  static execute() {
    return createTool({
      id: "search-web-tool",
      description:
        "Search the web to have more context to give a proper answer to the user",
      inputSchema: z.object({
        message: z.string(),
      }),
      outputSchema: z.object({
        answer: z.string(),
      }),
      execute: async ({ context }) => {
        const { message } = context;
        const result = await Tavily.search(message);

        return {
          answer: result,
        };
      },
    });
  }
}
