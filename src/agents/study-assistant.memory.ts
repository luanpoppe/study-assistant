import { fastembed } from "@mastra/fastembed";
import { LibSQLStore, LibSQLVector } from "@mastra/libsql";
import { Memory } from "@mastra/memory";

export class StudyAssistantMemory {
  static memory = new Memory({
    storage: new LibSQLStore({
      url: "file:./message-history.db",
    }),
    embedder: fastembed,
    vector: new LibSQLVector({
      connectionUrl: "file:./vector.db",
    }),
    options: {
      semanticRecall: {
        topK: 3, // Retrieve 3 most similar messages
        messageRange: 2, // Include 2 messages before and after each match
        scope: "resource",
      },
    },
  });
}
