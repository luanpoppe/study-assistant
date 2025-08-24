import { MCP } from "./mcp_server/server";
import "./utils/env";

const main = async () => {
  await MCP.initialize();
};

main();
