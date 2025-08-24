import "../../utils/env";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Agent } from "@mastra/core";
import { google } from "@ai-sdk/google";

export class SummarizeTool {
  static execute() {
    return createTool({
      id: "summarizer-tool",
      description: "Summarize the content sent by the user in a structured way",
      inputSchema: z.object({
        message: z.string(),
      }),
      outputSchema: z.object({
        answer: z.string(),
      }),
      execute: async ({ context }) => {
        const { message } = context;
        const content = await this.agent.generateVNext(message);

        return {
          answer: content.text,
        };
      },
    });
  }

  static agent = new Agent({
    name: "Summarizer Agent",
    instructions:
      "Summarize the content in a structured format, in the markdown format, with topics and sub-topics",
    model: google("gemini-2.5-flash-lite"),
  });
}
