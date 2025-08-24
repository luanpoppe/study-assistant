export class CreateFlashcardsPrompt {
  static description =
    "Generate a prioritized list of high-quality flashcards (question-answer pairs) that capture the most important concepts, definitions, formulas, and problem-solving steps from the provided content. Output should be concise, study-focused, and suitable for spaced-repetition.";

  static instructions =
    "From the provided content, produce an ordered list of high-quality flashcards in English. Each flashcard must be a clear question and a concise answer focused on the most important concepts, definitions, formulas, practical examples, and common pitfalls. Prioritize items that support active recall and long-term retention; avoid trivial facts. Prefer brevity and clarity. Format the output as a JSON array of objects with 'question' and 'answer' fields, or as a Markdown numbered list of Q/A pairs if JSON is not requested.";
}
