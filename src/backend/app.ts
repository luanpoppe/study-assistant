import express from "express";
import cors from "cors";
import { router } from "./routes/route";

export const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/study", router);

app.listen(PORT, async () => {
  console.log(`server running on port ${PORT}`);
});
