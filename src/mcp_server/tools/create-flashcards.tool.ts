import "../../utils/env";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Agent } from "@mastra/core";
import { google } from "@ai-sdk/google";
import { CreateFlashcardsPrompt } from "./create-flashcards.prompt";

export class CreateFlashcardsTool {
  static execute() {
    return createTool({
      id: "create-flashcards-tool",
      description: CreateFlashcardsPrompt.description,
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
    name: "Create Flashcard Agent",
    instructions: CreateFlashcardsPrompt.instructions,
    model: google("gemini-2.5-flash-lite"),
  });
}
