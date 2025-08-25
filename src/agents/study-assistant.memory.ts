import { LibSQLStore } from "@mastra/libsql";
import { Memory } from "@mastra/memory";

export class StudyAssistantMemory {
  static memory = new Memory({
    storage: new LibSQLStore({
      url: "file:./message-history.db",
    }),
  });
}
