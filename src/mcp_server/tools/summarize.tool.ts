import "../../utils/env";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Agent } from "@mastra/core";
import { google } from "@ai-sdk/google";

export class SummarizeTool {
  static execute() {
    return createTool({
      id: "summarizer-tool",
      description:
        "Produce a concise, study-focused summary of the provided content. Organize the output with clear headings, subheadings, and short bullet lists that highlight key concepts, definitions, formulas, examples, and action items. Emphasize information useful for revision and exam preparation, and include suggested study questions or flashcard prompts when appropriate. Keep the summary brief, well-structured, and machine-friendly for downstream processing.",
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
      "From the provided content, generate a concise, structured summary in English optimized for study and review. Use Markdown with clear headings and subheadings, short bullet lists for key points, definitions, formulas, and examples. Provide 3–5 concise takeaways and, when relevant, suggest up to five flashcard-style Q/A prompts for active recall. Note any contradictions, uncertainties, or prerequisites. Keep sections brief and focused to support rapid revision and programmatic consumption.",
    model: google("gemini-2.5-flash-lite"),
  });
}
