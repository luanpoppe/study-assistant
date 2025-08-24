import "../../utils/env";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import { Tavily } from "../../libs/tavily";

export class SearchWebTool {
  static execute() {
    return createTool({
      id: "search-web-tool",
      description:
        "Search the public web for authoritative, study-relevant information to provide context for the Study Assistant. Return a concise English summary of the most relevant findings including: (1) a short synthesized summary (2-4 sentences) explaining how the results relate to the user's query, (2) up to five key facts or takeaways, (3) cited sources with URLs and a credibility estimate for each source, and (4) any important caveats or contradictory evidence. Prefer reputable educational sources (peer-reviewed papers, official documentation, textbooks, and major educational websites). Keep the output concise and machine-readable so the calling agent can present or post-process the result.",
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
