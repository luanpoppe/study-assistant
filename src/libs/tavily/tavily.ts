import axios from "axios";
import { TavilySearchResponse, TavilySearchResult } from "./tavily.model";
import env from "../../utils/env";

export class Tavily {
  private static url = "https://api.tavily.com/search";

  static async search(query: string) {
    try {
      const response = await axios.post<TavilySearchResponse>(this.url, {
        api_key: env.TAVILY_API_KEY,
        query: query,
        search_depth: "basic",
        include_answer: false,
        max_results: 3,
      });

      const searchResults = response.data.results;

      if (!searchResults || searchResults.length === 0) {
        return "No results found on the internet for this search.";
      }

      return this.formatResponse(searchResults);
    } catch (error: any) {
      throw new Error(
        `An error occurred while trying to search the internet: ${error.message}`
      );
    }
  }

  private static formatResponse(searchResults: TavilySearchResult[]) {
    const formattedResults = searchResults
      .map(
        (result, index) =>
          `Fonte ${index + 1}: [${result.title}](${result.url})\nTrecho: ${
            result.content
          }`
      )
      .join("\n\n---\n\n");

    return formattedResults;
  }
}
